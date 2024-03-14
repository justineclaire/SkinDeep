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

        const [uid, setUid] = useState("");
        const [username, setUsername] = useState("");
        const [skintype, setSkintype] = useState("");
        const [user, setUser] = useState(null);
        const [recList, setRecList] = useState([]);
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUid(currentUser.uid);
                setUsername(currentUser.displayName);
                setUser(currentUser);
                //console.log(currentUser);
            });

            // Return the unsubscribe function to clean up the subscription
            return unsubscribe;
        }, []); 
       
        useEffect(() => {
            
            if(user) {
                try{
                    axios.get(`http://localhost:8800/user/${uid}`)
                    .then(res => {
                        //console.log(res.data);
                        setSkintype(res.data[0].skintype);
                    })
                }catch(error) {
                    console.log(error);
                }
                
            }
        
        }, [uid]); 
       

        useEffect(() => {
            
            if(user) {                
                try{
                    axios.get(`http://localhost:8800/recs/${user.uid}`)
                    .then(recs => {
                        //console.log(recs);
                        setRecList(recs.data);
                        console.log(recList);
                    })
                }catch(error) {
                    console.log(error);
                }
                
            }
            
        }, [uid]); 
        
        
        
        
    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <Login />
            <div className='content'>
            <div>
            
                    {user ? (
                        <>
                            <h1>Welcome {username}!</h1>
                            <p>You have {skintype ? skintype: "beautiful"} skin</p>

                            <h2>Here are some product recommendations for you:</h2>
                            <ul>
                                {recList.map(function(product, index){
                                    return <li key={index}>{product.Name}</li>
                                })} 
                            </ul>

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
