import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import firebaseApp from "../firebaseSetup";

class Auth {
  app = firebaseApp;
  googleAuth = getAuth();
  functions = getFunctions();
  provider = new GoogleAuthProvider();
  authenticated: boolean;
  user = this.googleAuth.currentUser;
  
  constructor() {
    let authenticated = localStorage.getItem( 'authenticated' );
    if(authenticated === "true"){
      this.authenticated = true;
    } else {
      this.authenticated = false;
      localStorage.setItem( 'authenticated', "false" );
    }
  }

  async tokenSignIn(token: string, cb: () => void) {
    const credential = GoogleAuthProvider.credential(null, token);
    await signInWithCredential(this.googleAuth, credential).then(() => {
      console.log("SUCCESS SIGN IN");
      // The signed-in user info.
        // const user = result.user;
        this.authenticated = true;
        localStorage.setItem( 'authenticated', "true" );
        cb();
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.error("Google Login Error: email", email, "; code:", errorCode, "; message:", errorMessage);
    })
  }

  async googleSignIn(cb: () => void) {
    signInWithPopup(this.googleAuth, this.provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("SUCCESS SIGN IN")
        
        // The signed-in user info.
        this.authenticated = true;
        localStorage.setItem( 'authenticated', "true" );
        cb()
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        console.error("Google Login Error: email", email, "; code:", errorCode, "; message:", errorMessage);
    });
  }

  login(cb: () => void) {
    this.authenticated = true;
    localStorage.setItem( 'authenticated', "true" );
    cb()
  }

  logout(cb: () => void) {
    this.authenticated = false;
    localStorage.setItem( 'authenticated', "false" );
    cb();
  }

  isAuthenticated() {
    return this.authenticated
  }

  async getUserEmail(){
    return this.googleAuth.currentUser?.email!;
  }
}


export default new Auth();