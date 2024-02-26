import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../components/clouds.mp4';
import Login from '../components/login';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  

function Profile() {

        const [user, setUser] = useState({})

        useEffect(() => {
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    //console.log(currentUser);
                });
        });
    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <Login />
            <div className='content'>
            <div>
            
                    {user ? (
                        <>
                            <h1>Welcome {user.email}!</h1>
                            
                        </>
                    ) : (
                        <>
                            <h1>Please sign in</h1>
                            <button><Link to="/">Return Home</Link></button>
                        </>
                    )}
            <div>
                
            </div>
            
        </div>
            </div>
        </div>
        
    );
};

export default Profile;
