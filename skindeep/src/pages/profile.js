import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../components/clouds.mp4';
import Login from '../components/login';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';

function Profile() {

        const [user, setUser] = useState({})
        const [skintype, setSkintype] = useState("");
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                //console.log(user.uid);
            });

            // Call getInfo when the component mounts
            getInfo();

            // Return the unsubscribe function to clean up the subscription
            return unsubscribe;
        }, []); 
       
        const getInfo = () => {
            axios.get(`http://localhost:8800/user/${user.uid}`)
            .then(res => {
                console.log(res.data);
                setSkintype(res.data[0].skintype);
            })
        }
        
    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <Login />
            <div className='content'>
            <div>
            
                    {user ? (
                        <>
                            <h1>Welcome {user.email}!</h1>
                            <p>You have {skintype} skin</p>
                            
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
