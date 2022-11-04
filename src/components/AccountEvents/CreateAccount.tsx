import React, { useState } from 'react';
import './AccountEvents.css';
import { getAuth, createUserWithEmailAndPassword, User, UserCredential, sendEmailVerification } from 'firebase/auth';
import { string } from 'yup';

interface UserData {
    email: string;
    password: string;
    reenterPassword: string;
    currentState: boolean;
}

const auth = getAuth();
  

async function createUser(credentials: { email: string; password: string;}){
    let user = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            window.alert('user sucessfully created! please verify email!')
            // Create User
            sendEmailVerification(auth.currentUser as User).then(() => {
                // Email verification sent!
            }).catch (e => {
                console.error(e);
            })
            return userCredential.user;
        }).catch(e => {
            console.log("Unable to Create User " + e);
            window.alert("failed to create user")
        })
    return user;    
}

type Props = {
    setToken: (value: boolean) => void;
}
const CreateAccount: React.FC<Props> = ({
    setToken
}) => {
    const [email, setEmail] = useState<UserData["email"] | null>(null);
    const [password, setPassword] = useState<UserData["password"] | null>(null);
    const [reenterPassword, setReenterPassword] = useState<UserData["reenterPassword"] | null>(null)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (reenterPassword === password) {
            const user = await createUser({
                email: email !== null ? email : "",
                password: password !== null ? password : ""
              });
              if (user){
                  setToken(true);
                  window.location.href="/onboarding";
              } else {
                  window.alert("Unable to create account!")
              }
        } else {
            window.alert("passwords do not match!")
        }
        
    }

    return(
        <div>
            <img className= "LogoAccountEvents" src="images/okane_logo_128.png" alt="BigCo Inc. logo"/>

            <div className="login-wrapper">
                <h1 className="login-header">Welcome to Okane!</h1>   
                <h2 className="login-header" style={{left: '41px', right: '213px', bottom: '25px', top: '50px'}}>Create Account</h2>
                <form onSubmit={handleSubmit} style= {{position: 'relative', left: '41px', top: '50px'}}>
                    <label>
                        <input className="input-box" type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <input className="input-box" type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <input className="input-box" type="password" placeholder="Re-enter password" onChange={e => setReenterPassword(e.target.value)}/>
                    </label>
                    <br/>
                    <a href='Login'>
                        <text style={{ textDecorationLine: 'underline', top: '50px'}}>
                            Already a user?
                        </text>
                    </a>
                    <button type="submit" className='button-text' style={{ left: '182px', top: '50px'}}>Sign Up</button>
                    
                </form>
            </div>
        </div>
    )
}
export default CreateAccount