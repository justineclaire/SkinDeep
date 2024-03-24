import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navbar';
import Products from '../components/products';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function Profile() {

        const [uid, setUid] = useState("");
        const [username, setUsername] = useState("");
        const [skintype, setSkintype] = useState("");
        const [user, setUser] = useState(null);
        const [recList, setRecList] = useState([]);
        const [quiztaken, setQuizTaken] = useState(false);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUid(currentUser.uid);
                setUsername(currentUser.displayName);
                setUser(currentUser);
                
                if(currentUser === null) {
                    setUser(null);
                }
            });

            // Return the unsubscribe function to clean up the subscription
            return unsubscribe;
        }, []); 
       
        useEffect(() => {
            try {
                if(user) {
                    axios.get(`http://localhost:8800/user/${uid}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            setQuizTaken(true);
                            setSkintype(res.data[0].skintype);
                        } else {
                            setQuizTaken(false);
                        }
                        
                    })
                }
            } catch (error) {
                console.log(error);
                console.log("from profile.js")
            }
            
        }, [user]); 
       

        useEffect(() => {
            try {
                if(quiztaken && user) {                
                    try{
                        axios.get(`http://localhost:8800/recs/${user.uid}`)
                        .then(recs => {
                            setRecList(recs.data);
                        })
                    }catch(error) {
                        console.log("ahhh recs axios error");
                    }
                    
                }
            } catch (error) {
                console.log(error);
            }
            
        }, [user, quiztaken]); 
        
    return (
        <div className='main'>
            <Nav />
            <div className='content'>
            <div>
                
            
                    { quiztaken ? (
                        <>
                            <h1>Welcome {username}!</h1>
                            <p>You have beautiful skin</p>
                            <div>
                                <h2>Here are some product recommendations for you:</h2>
                                <ul>
                                    <Products />
                                </ul>
                            </div>
                        </>
                    ) : (

                        user ? (<>
                            <h1>Take our skin quiz to get product recommendations!</h1>
                            <Button><Link to="/quiz">Quiz</Link></Button>
                        </>) : (
                            <h1>Please log in</h1>
                        )
                        
                    )}
            <div>
                
            </div>
            
        </div>
            </div>
        </div>
        
    );
};

export default Profile;
