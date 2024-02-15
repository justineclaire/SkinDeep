import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import { Button } from 'semantic-ui-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../App.css";
import { Message } from 'semantic-ui-react';
import { auth } from "../firebase";  

function Login() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
 
  
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("The password is too weak.");
      }
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("This email does not have an account, please sign up");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password please try again");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  let [authMode, setAuthMode] = useState("signin")
    
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (user) {
      return(
        <div>
          <div id='profbtn'>
                <Button ><Link to="/profile">My Profile</Link></Button>
          </div>
        
            
            <div id='logbtn'>
                <Button  onClick={logout}>logout</Button>
            </div>
        </div>
      );

    }
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <div>
                <div id='logbtn'>
                    <Button  onClick={setModalOpen}>login here</Button>
                </div>
             </div>
            <Modal
                  id='modal'
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  //style={customStyles}
              >
            <form className="Auth-form">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  className='form-control mt-1'
                  placeholder="Email..."
                  type="email"
                  onChange={(event) => {
                      setLoginEmail(event.target.value);
                  }}
                  />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className='form-control mt-1'
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => {
                      setLoginPassword(event.target.value);
                  }}
                  />
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button type="Button" className="btn btn-primary" onClick={login}>
                  Login
                </Button>
                <h4> User Logged In: {user?.email}</h4>
                {errorMessage && (
                <Message color='red'>
                    {errorMessage}
                </Message>
                )}
                
              </div>
            </form>
          </Modal>
        </div>
      )
    }
    return (
        
      <div className="Auth-form-container">
          <div>
                <div id='logbtn'>
                    <Button  onClick={setModalOpen}>login here</Button>
                </div>
             </div>
            <Modal
                  id='modal'
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  
              >
            <form className="Auth-form">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="text-center">
                Already have an account?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Log In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  className='form-control mt-1'
                  placeholder="Email..."
                  type="email"
                  onChange={(event) => {
                      setRegisterEmail(event.target.value);
                  }}
                  />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className='form-control mt-1'
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => {
                      setRegisterPassword(event.target.value);
                  }}
                  />
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button type="Button" className="btn btn-primary" onClick={register}>
                  Register
                </Button>
                <h4> User Logged In: {user?.email}</h4>
                {errorMessage && (
                <Message color='red'>
                    {errorMessage}
                </Message>
                )}
                
              </div>
            </form>
          </Modal>
        </div>
      )
};

export default Login;

