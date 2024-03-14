import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../components/clouds.mp4';
import Login from '../components/login';
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
                
            });

            // Return the unsubscribe function to clean up the subscription
            return unsubscribe;
        }, []); 
       
        useEffect(() => {
            
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
        
        }, [uid]); 
       

        useEffect(() => {
            
            if(quiztaken) {                
                try{
                    axios.get(`http://localhost:8800/recs/${user.uid}`)
                    .then(recs => {
                        setRecList(recs.data);
                    })
                }catch(error) {
                    console.log("ahhh recs axios error");
                }
                
            }
            
        }, [uid]); 
        
        
        
        
    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <Login />
            <div className='content'>
            <div>
            
                    {quiztaken ? (
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
                            <h1>Take our skin quiz to get product recommendations!</h1>
                            <Button><Link to="/quiz">Quiz</Link></Button>

                            
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
