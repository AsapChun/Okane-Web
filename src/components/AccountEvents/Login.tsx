import React from 'react';
import './AccountEvents.css';
import GoogleButton from 'react-google-button';
import { getFunctions, httpsCallable } from 'firebase/functions';
import auth from './../../models/auth'
import { useHistory, useLocation } from 'react-router-dom';
import mixpanel from './../../models/mixpanel'

interface Props {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

const functions = getFunctions();

const Login : React.FC<Props> = (props: any) => {
    const location = useLocation();
    let token = new URLSearchParams(location.search).get("token");
    const history = useHistory();
    if (token) {
        auth.tokenSignIn(token, async () => {
            localStorage.setItem('authenticated', "true" );
            props.setIsAuth(true);
            const onboardingState = await validateOnboarding();
            return onboardingState;
        });
    }
    async function validateOnboarding() {
        let validatePlaid = httpsCallable(functions, 'validatePlaidLinked');
        let response = validatePlaid().then((result : any) =>{
            let plaidLinked : boolean = result.data.plaidLinked;
            localStorage.setItem('authenticated', "true" );
            props.setIsAuth(true);
            if (plaidLinked) {
                history.push("/dashboard");
                return plaidLinked; 
            } else {
                history.push("/onboarding");
                return plaidLinked;
            }
        }).catch(ex => {
            console.error(ex);
        })
        return response;
    }
    return(
        <div> 
            {mixpanel.trackEvent("Login Page Opened")}
            <img className= "LogoAccountEvents" src="images/okane_new_logo.png" alt="BigCo Inc. logo" style={{width: "auto", height: '75px', zIndex: "100"}}/>   
            <div className="login-wrapper">
                <div className="login-header">Welcome to Okane!</div>
                <div className="login-secondary">For new and existing user's, continue by clicking below </div>
                <form style= {{position: 'relative', left: '10%', top: '30px'}}>
                    <GoogleButton style ={{width: "80%"}} onClick={() => {
                        auth.googleSignIn(async () => {
                            const onboardingState = await validateOnboarding();
                            return onboardingState;
                        })
                    }}/>
                    <br/>
                </form>
                <hr></hr>
                <div style={{bottom: "50px"}} className="login-privacy"><b>See our privacy policy <a target="_blank" rel="noopener noreferrer" href = "https://okane.crd.co/#privacy">here</a>. By proceeding, you accept and acknowledge the terms/agreements within our privacy policy.</b> <br/>Please proceed on Desktop only, instead of tablet / mobile</div>
            </div>
        </div>
    )
}

export default Login
