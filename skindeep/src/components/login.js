import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import { Button } from 'semantic-ui-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import "../App.css";
import { Message } from 'semantic-ui-react';
import { auth } from "../firebase";  
import buttonimg from './imgs/glow.png';
import heart from './imgs/heart.png';

function Login() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //console.log(currentUser);
    });


    return () => {
      unsubscribe();
    };
  }, []);


  const register = async () => {
    try {
      const user = createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((UserCredentialImpl) => {
      if (UserCredentialImpl.user) {
        updateProfile(UserCredentialImpl.user, {
          displayName: registerUsername
        });

        console.log(UserCredentialImpl.user);
      }});
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
        <div className='flex flex-row'>
          <div id='profbtn' className='mx-10'>
                <button className='flex flex-row xs:px-2 xs:py-2 md:px-7 md:py-5 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-400' ><Link to="/profile" className='flex text-white items-center'>
                  <img className='h-10 w-10 xs:h-4 xs:w-4'src={heart} />
                <span className='font-Archivo px-3 xs:px-0'>  My Profile  </span>
                </Link></button>
          </div>
        
            
            <div id='logbtn'>
                <button className='flex flex-row xs:px-2 xs:py-2 md:px-7 md:py-5 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-400' onClick={logout}>
                  <img className='h-10 w-10 xs:h-4 xs:w-4' src={heart} />
                  <span className='font-Archivo px-3 xs:px-0'> Log out </span></button>
            </div>
        </div>
      );

    }
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <div>
                <div id='logbtn'>
                    <button className='flex flex-row px-7 py-5 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600' onClick={setModalOpen}><img className='h-10 w-10 xs:h-4 xs:w-4'src={heart} /><span className='font-Archivo px-3 xs:px-0'> Login </span><img className='h-10 w-10 xs:h-4 xs:w-4'src={heart} /></button>
                </div>
             </div>
            <Modal animation={false}
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
                <label>Name</label>
                <input
                  className='form-control mt-1'
                  placeholder="Username..."
                  type="text"
                  onChange={(event) => {
                      setRegisterUsername(event.target.value);
                  }}
                  />
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

