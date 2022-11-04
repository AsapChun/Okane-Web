import { getFunctions, httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from 'react';
import { Placeholder } from "react-bootstrap";
import { usePlaidLink } from 'react-plaid-link';

const functions = getFunctions();

interface props {
  plaidItemId: string
}

function UpdatePlaid(props: props) {
  const createUpdateLink = httpsCallable(functions, 'createUpdateLink');
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    createUpdateLink({plaidItemId: props.plaidItemId})
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
  useEffect(() => {
    if (window.location.href.includes("?oauth_state_id=")) {
      let token : any = localStorage.getItem("link_token");
      setLinkToken(token)
      return
    }
    generateToken();
  }, []);

  return (linkToken != null ? <Link linkToken={linkToken} plaidItemId={props.plaidItemId}/>  : <><Placeholder.Button variant="primary" xs={1} /></> );
}
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
// 'https://us-central1-okane-database.cloudfunctions.net/plaidToken/getToken'
interface LinkProps {
  linkToken: string | null;
  plaidItemId: string;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback(async (public_token, metadata) => {
    // You do not need to repeat the /item/public_token/exchange
    // process when a user uses Link in update mode.
    // The Item's access_token has not changed.
    const updatePlaidItemSuccess = httpsCallable(functions, 'updatePlaidItemSuccess');
    updatePlaidItemSuccess({plaidItemId: props.plaidItemId}).then((result) => {
      window.location.reload();
    })
  }, []);

  let isOauth = false;
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
      <button style= {{left: "10px"}}onClick={() => open()} disabled={!ready}>
        <div className='button-text'>Reconnect</div>
      </button>
    </div>
  );
};

export default UpdatePlaid