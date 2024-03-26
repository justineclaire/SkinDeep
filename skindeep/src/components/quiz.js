import React, { useEffect, useState } from 'react';
import questions from './questions.js';
import { Message, Input  } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import webpage from '../components/imgs/webpage.png';
import Nav from '../components/navbar.js'
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";
import bg from '../components/imgs/back.png';

function Quiz() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [userResponses, setUserResponses] = useState({
        uid: '',
        name: '',
        skintype: '',
        sensitive: null,
        acne: null,
        age: null,
        bright: null,
        bh: null,
        red: null,
        tex: null,
        barrier: null,
        hyper: null
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            setUserResponses({...userResponses, uid: currentUser.uid, name: currentUser.displayName});
            console.log(currentUser.displayName);
        }
        });

        return () => {
        unsubscribe();
        };
    }, []);

    const [errorMessage, setErrorMessage] = useState("");
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState("");


    const chosenAnswer = (ans) => {
        if(ans.includes("Yes")) {
            setUserResponses({...userResponses, [questions[current].key]: true})
        }
        else if(ans.includes("No")) {
            setUserResponses({...userResponses, [questions[current].key]: false})
        }
        else if(ans.includes("Oily") || ans.includes("Dry") || ans.includes("Combination") || ans.includes("Normal")) {
            setUserResponses({...userResponses, [questions[current].key]: ans})
        }
        setSelected(ans);
    }

    const handleNext = () => {
        if (userResponses[questions[current].key] === null) {
            setErrorMessage("Please select an answer");
            setTimeout(() => {setErrorMessage("")}, 3000);
            return;
        } else {
            setSelected("");
            setCurrent(current + 1);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
    
        console.log(userResponses);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/createprof`, userResponses) 
        .then((res) => {
        navigate('/profile');
        console.log(res)
        })
        .catch((err) => console.log(err));
        
    }

    
return (
    <div className='' >
        <Nav />
        <div className='content font-Archivo text-center sm:text-xl xs:text-lg bg-sky bg-cover flex justify-center items-center' style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: 'cover'}} >
        { !user ? (
            <div className='quiz bg-pink-100 rounded-xl w-2/3 h-2/3'>
                    <div className=''>please login first</div>
            </div>
        ) : ( 
            
            <div className='flex flex-col md:w-11/12 sm:w-full mb-auto xs:pt-10 sm:mt-2 sm:bg-center sm:bg-contain bg-no-repeat justify-center items-center rounded-xl bg-none-xs'
                style={{backgroundImage: `url(${webpage})`}}>

                <div className='flex flex-col justify-between items-center sm:p-40 xs:p-8 w-2/3 h-1/5'>
                    <span>Question {current +1} / {questions.length}</span>

                    <div className='text-slate-600 text-wrap fond-boldest sm:text-xl xs:text-lg'>
                        {questions[current].question}
                    </div>
                    <div className='answers'>
                    <div className='flex flex-col justify-between items-center'>
                        { 
                            questions[current].options.length > 0 ? (
                                questions[current].options.map((option) => (
                                <button  
                                    className={`bg-sky rounded-xl my-1 w-64 h-12 ${selected === option ? "selected" : "unselected"}`}
                                    key={option}
                                    onClick={() => chosenAnswer(option)}
                                    value={option}
                                >
                                    {option}
                                </button  >
                                ))
                            ) : (
                                null
                            )
                        }
                    </div>
                       {current < questions.length - 1 ? (
                        <div className='flex justify-center items-center'>
                        
                          <button 
                            className='w-64 h-12 bg-webpink'
                            onClick={() => {handleNext()}}
                          >
                            Next ➡️
                          </button >
                       {errorMessage.length > 0 && <Message color='red'>{errorMessage}</Message>}
                      </div>
                      ) : (
                            <button 
                                className='rounded-xl w-64 h-12 bg-webpink'
                                type='submit'
                                onClick={(e) => submit(e)}
                            >
                            Submit 
                            </button >
                       )}
                    
                    </div>
                </div>
            </div>
        )}
            
        </div>
        
    </div>
        
    
);

};
export default Quiz;
