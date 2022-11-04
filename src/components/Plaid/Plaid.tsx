import { getFunctions, httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { usePlaidLink } from 'react-plaid-link';

const functions = getFunctions();

const getValidatePlaidLinked = httpsCallable(functions, 'validatePlaidLinked');

interface props {
  plaidLinked: boolean,
  setPlaidLinked: (state:boolean) => void,
  setPlaidLinkingProgress: (state:boolean) => void,
}

function Plaid({plaidLinked, setPlaidLinked, setPlaidLinkingProgress}: props) {
  const createLinkToken = httpsCallable(functions, 'createLinkToken');
  const [linkToken, setLinkToken] = useState(null);
  
  const generateToken = async () => {
    createLinkToken()
      .then((result) => {
            // Read result of the Cloud Function.
            /** @type {any} */
            let data: any;
            data = result.data;
            // const sanitizedMessage = data.text;
            localStorage.setItem("link_token", data.link_token); //to use later for Oauth
            setLinkToken(data.link_token);
    }).catch(ex => {
      console.log("link token error: " + ex)
    })
  };
  const checkPlaidLinked = async () => {
    let response = await getValidatePlaidLinked().then((result: any) => {
      setPlaidLinked(result.data.plaidLinked);
      return result.data.plaidLinked;
    });
    console.log("plaidLinked result:", response)
  }
  useEffect(() => {
    if (window.location.href.includes("?oauth_state_id=")) {
      let token : any = localStorage.getItem("link_token");
      setLinkToken(token)
      return
    }
    checkPlaidLinked();
    generateToken();
  }, []);

  return (linkToken != null ? <Link plaidLinked={plaidLinked} setPlaidLinkingProgress={setPlaidLinkingProgress} linkToken={linkToken} setPlaidLinked={setPlaidLinked} />  : <><Button disabled style= {{left: "10px"}}><div className='button-text'>Loading</div></Button></> );
}
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
// 'https://us-central1-okane-database.cloudfunctions.net/plaidToken/getToken'
interface LinkProps {
  linkToken: string | null;
  plaidLinked: boolean;
  setPlaidLinked: (state:boolean) => void;
  setPlaidLinkingProgress: (state: boolean) => void;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback(async (public_token, metadata) => {
    // const getAccessTokenUrl = 'https://us-central1-okane-database.cloudfunctions.net/plaidToken/getAccessToken';
    // send public_token to server
    props.setPlaidLinkingProgress(true);
    const getAccessToken = httpsCallable(functions, 'exchangeUpsertToken');
    getAccessToken({public_token: public_token}).then((result)=>{
      // Read result of the Cloud Function.
      /** @type {any} */
      props.setPlaidLinkingProgress(false);
      props.setPlaidLinked(true);
    }).catch(ex => {
      props.setPlaidLinkingProgress(false);
      console.log("getAcessTokenError: " + ex);
    })
  }, []);

  let isOauth = false;
  
  // receivedRedirectUri: window.location.href,
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess,
  };
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  
  return (
    <div>
      {ready ?
        (props.plaidLinked ? 
          <button className = "buttonDiv" style= {{ background: '#A2A3A8'}} onClick={() => open()} >
            <div className='button-text'>Add Account</div>
          </button> 
          :
          <button className = "buttonDiv" style= {{}} onClick={() => open()} >
            <div className='button-text'>Link New Account</div>
          </button>
        )
        :
        <button className = "buttonDiv" style= {{backgroundColor: '#A2A3A8'}} onClick={() => console.log("loading")} >
          <div className='button-text '>Loading</div>
        </button>
      }
    </div>
  );
};

export default Plaid