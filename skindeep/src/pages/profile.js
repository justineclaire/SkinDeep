import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navbar';
import Products from '../components/products';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';
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
                    axios.get(`${REACT_APP_BACKEND}/user/${uid}`)
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
                        axios.get(`${REACT_APP_BACKEND}/recs/${user.uid}`)
                        .then(recs => {
                            setRecList(recs.data);
                        })
                    }catch(error) {
                        console.log(" recs axios error");
                    }
                    
                }
            } catch (error) {
                console.log(error);
            }
            
        }, [user, quiztaken]); 
        
    return (
        
        <div className='' >
            
            <div className='flex flex-col justify-center items-center font-Archivo text-center sm:text-xl xs:text-lg bg-sky bg-fixed h-screen p-5 overflow-auto' style={{backgroundImage: `url(${bg})`, height: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
            <Nav /> 
            
                    { user ? (
                        <>  
                        {quiztaken ? (<>
                            <div className='flex flex-col items-center mt-5 h-screen xs:w-5/6 sm:w-full'>
                                <h1 className='font-ggoodfood text-pink-700'>Welcome {username}!</h1>
                                <div>
                                    <h2 className='xs:text-sm p-2 sm:text-lg'>Here are some product recommendations for you based on your quiz results:</h2>
                                    <p className='xs:text-sm p-2 sm:text-lg' >Feel free to re-do the <Link to='/quiz' className='text-white underline'>quiz</Link> to change your skin profile and recommendations</p>
                                        <div className='md:w-[760px] xs:w-[300px] lg:w-[900px] sm:w-[580px] bg-webpink p-4 rounded-xl' >
                                            <Products />
                                        </div>
                                    
                                </div>
                            </div>
                            </>) : (
                                <div>
                                <h1 className='text-lg p-20'>Take our skin quiz to get product recommendations!</h1>
                                <button className='w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'><Link to="/quiz"className='text-slate-700'>Quiz</Link></button>
                                </div>
                            )}
                            
                        </>
                    ) : (
                        <div className='flex flex-col justify-center items-center h-screen bg-no-repeat bg-center bg-contain rounded-xl bg-none-xs'
                        style={{backgroundImage: `url(${webpage})`}}>
                            
                                <h1 className='text-lg p-20'>Please log in to see your skincare recommendations!</h1>
                            
                        </div>
                        
                    )}
            <div>
                
            
            
        </div>
            </div>
        </div>
        
    );
};

export default Profile;
