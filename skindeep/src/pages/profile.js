import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navbar';
import Products from '../components/products';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';
import { button } from 'semantic-ui-react';
import bg from '../components/imgs/back.png';
import webpage from '../components/imgs/webpage.png';

function Profile() {

        const [uid, setUid] = useState("");
        const [username, setUsername] = useState("");
        const [skintype, setSkintype] = useState("");
        const [user, setUser] = useState(null);
        const [recList, setRecList] = useState([]);
        const [quiztaken, setQuizTaken] = useState(false);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    setUid(currentUser.uid);
                    setUsername(currentUser.displayName);
                    setUser(currentUser);
                } else {
                    setUser(null);
                }
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
        
        <div className='' >
            <Nav />
        <div className=' text-slate-700 flex flex-col justify-start items-center font-Archivo text-center sm:text-xl xs:text-lg bg-sky bg-fixed h-screen p-5' style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: 'cover'}} >
          
            
                    { quiztaken ? (
                        <>  
                            <div className='mt-5 h-screen xs:w-5/6 sm:w-full'>
                                <h1>Welcome {username}!</h1>
                                <div>
                                    <h2 className='text-lg'>Here are some product recommendations for you based on your quiz results:</h2>
                                    <ul>
                                        <div className='h-1/3' >
                                        <Products />
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col justify-center items-center h-screen bg-no-repeat bg-center bg-contain rounded-xl bg-none-xs'
                        style={{backgroundImage: `url(${webpage})`, marginTop: '5'}}>
                            {
                            user ? (<>
                                <h1 className='text-lg p-20'>Take our skin quiz to get product recommendations!</h1>
                                <button className='w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'><Link to="/quiz"className='text-slate-700'>Quiz</Link></button>
                            </>) : (
                                <h1 className='text-lg p-20'>Please log in</h1>
                            )}
                        </div>
                        
                    )}
            <div>
                
            
            
        </div>
            </div>
        </div>
        
    );
};

export default Profile;
