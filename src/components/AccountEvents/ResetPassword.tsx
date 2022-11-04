import React, { useState } from 'react';
import './AccountEvents.css';
import { getAuth, sendPasswordResetEmail, User, UserCredential, sendEmailVerification } from 'firebase/auth';

interface UserData {
    email: string;
    password: string;
    currentState: boolean;
}

const auth = getAuth();

async function resetPassword(credentials: { email: string}){
    let user = await sendPasswordResetEmail(auth, credentials.email)
        .then(() => {
            window.alert('Reset Password Email has been sent!')
            // Create User
            return ;
        }).catch(e => {
            console.log("Unable to Reset Password " + e);
            window.alert("Unable to Reset Passwrod")
        })
    return user;    
}

const ResetPassword = ({
    
}) => {
    const [email, setEmail] = useState<UserData["email"] | null>(null);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const token = await resetPassword({
          email: email !== null ? email : ""
        });
        window.location.href="/Login";
        
        
    }

    return(
        <div>
            <img className= "LogoAccountEvents" src="images/okane_logo_128.png" alt="BigCo Inc. logo"/>
            <div className="login-wrapper" style={{height: '290px'}}>
                <h1 className="login-header">Reset Password</h1>
                <text className="login-header" style={{left: '41px', right: '213px', bottom: '25px', top: '50px'}}>A email will be sent to reset your password</text>
                <form onSubmit={handleSubmit} style= {{position: 'relative', left: '41px', top: '50px'}}>
                    <label>
                        <input className="input-box" type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <br/>
                    <a href='Login'>
                        <text style={{ textDecorationLine: 'underline', top: '40px'}}>
                            Remember Password?
                        </text>
                    </a>
                    <div>
                        <button type="submit" style={{ left: '290px', top: '10px'}}>
                            <div className='button-text'>Reset Password</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ResetPassword