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
    const [quiztaken, setQuizTaken] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState("");
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
    let updatedResponses = {
        skintype: userResponses.skintype,
        sensitive: userResponses.sensitive,
        acne: userResponses.acne,
        age: userResponses.age,
        bright: userResponses.bright,
        bh: userResponses.bh,
        red: userResponses.red,
        tex: userResponses.tex,
        barrier: userResponses.barrier,
        hyper: userResponses.hyper,
        uid: userResponses.uid
    };

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

    //check if user has skin profile already
    useEffect(() => {
        
        
    }, [user]); 
   


    const chosenAnswer = (ans) => {
        if(ans.includes("Yes")) {
            setUserResponses(prevState => ({...prevState, [questions[current].key]: true}));
        }
        else if(ans.includes("No")) {
            setUserResponses(prevState => ({...prevState, [questions[current].key]: false}));
        }
        else if(ans.includes("Oily") || ans.includes("Dry") || ans.includes("Combination") || ans.includes("Normal")) {
            setUserResponses(prevState => ({...prevState, [questions[current].key]: ans}));
        }
        setSelected(ans);
        console.log(userResponses);
    }
    

    const handleNext = () => {
        if (userResponses[questions[current].key] === null) {
            setErrorMessage("Please select an answer before moving on");
            setTimeout(() => {setErrorMessage("")}, 3000);
            return;
        } else {
            setSelected("");
            setCurrent(current + 1);
        }
    };

    const handlePrevious = () => {
        setSelected("");
        setCurrent(current - 1);
    
    };

    const submit = async (e) => {

        e.preventDefault();
        try {
            if(user) {
                axios.get(`${REACT_APP_BACKEND}/user/${user.uid}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setQuizTaken(true);
                        axios.post(`${REACT_APP_BACKEND}/updateprof`, updatedResponses)
                        .then((res) => {
                            navigate('/profile');
                            console.log(res);
                        })
                        .catch((err) => console.log(err));
                    } else {
                        setQuizTaken(false);

                        axios.put(`${REACT_APP_BACKEND}/createprof`, userResponses) 
                        .then((res) => {
                        navigate('/profile');
                        console.log(res)
                        })
                        .catch((err) => console.log(err));
                    }
                    
                })
            }
        } catch (error) {
            console.log(error);
            console.log("from profile.js")
        }
        
    }


    
return (
    <div className='bg-cover' style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: 'cover'}}  >
        <Nav />
        <div className='content font-Archivo text-center sm:text-xl xs:text-lg  flex justify-center items-center' >
        
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
                            {current !== 0 ? (
                                <button className='rounded-xl w-64 h-12 bg-webpink hover:bg-pink-700'
                                onClick={() => {handlePrevious()}}
                                    >
                                ⬅️ Previous</button>
                            ): ''}
                        
                          <button 
                            className='rounded-xl w-64 h-12 bg-webpink hover:bg-pink-700'
                            onClick={() => {handleNext()}}
                          >
                            Next ➡️
                          </button >
                       {errorMessage.length > 0 ? ( <Message negative>{errorMessage}</Message>) : ''}
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
