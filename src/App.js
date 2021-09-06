import React from 'react';
import './App.css';  
import firebaseConfig from './firebase.config';
import * as  firebase from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider , signOut} from "firebase/auth";
import { useState } from 'react/cjs/react.development';
 

firebase.initializeApp(firebaseConfig);
function App() {

  const provider = new GoogleAuthProvider();
  
  const [user, setUser] = useState({
    isSignedIn:false,
    name:"",
    email:"",
    photo:""
  })
 




const handleCLick =()=>{
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {


    const {displayName, email, photoURL}= result.user;   
    const signInUser = {

      isSignedIn:true,
      name:displayName,
      email:email,
      photo:photoURL,
    }
    setUser(signInUser);
    console.log(displayName, email, photoURL);
    console.log(result);
     
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
     
    // const user = result.user;
 
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
   
    const email = error.email;
     
    const credential = GoogleAuthProvider.credentialFromError(error);
  
  });
     
}
const signOuts = () =>{
  const auth = getAuth();
signOut(auth).then(() => {
 
  const signOutUser ={
    isSignedIn:false,
    name:"",
    email:"",
    photo:""

  }
  setUser(signOutUser);
  
}).catch((error) => {
  // An error happened.
});
}

  return (
    <div className="App">
       
     { user.isSignedIn ? <button onClick={signOuts}>Sign Out</button> :
     <button onClick={handleCLick}>Sign In</button>
     
     }
      {user.isSignedIn && <div>

        <p>Wellcome {user.name}</p>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt="" /> 
        
                                      </div>}
 

    </div>
  );
}

export default App;
