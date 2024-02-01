import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import clouds from '../assets/clouds.mp4';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../App.css";
import { Message } from 'semantic-ui-react';
import { auth } from "../firebase";  // Add getAuth to the import
function Login() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
 
  
signOut(auth).then(() => {
// Sign-out successful.
}).catch((error) => {
// An error happened.
});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signUpButton = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
  };

  const logInButton = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    return (
        <div>
             <div>
                <div id='logbtn'>
                    <button  onClick={setModalOpen}>login here</button>
                </div>
             </div>
                
                <Modal
                  id='modal'
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  //style={customStyles}
                >
                  <div>
                    
                   <h1>Login/Signup</h1> 
                   <form>
                      <label>
                        Name:
                        <input type="text" name="name" />
                      </label>
                      <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                      </label>
                      <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                      </label>
                      <button type="submit" value="SignUp" onClick={signUpButton}>Sign up</button>
                      <button type="submit" value="LogIn" onClick={logInButton}>Log in</button>
                    </form>
                  </div>
                  <div>
                  
                  </div>
                  <button onClick={() => setModalOpen(false)}>Close Modal</button>
                </Modal>
        </div>
    );
};

export default Login;

