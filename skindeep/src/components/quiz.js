import React, { useEffect, useState } from 'react';
import clouds from '../components/clouds.mp4';
import questions from './questions.js';
import { ButtonGroup, Button, Message, Input  } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/login';
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";

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
            setUserResponses({...userResponses, uid: currentUser.uid});
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
        axios.post('http://localhost:8800/createprof', userResponses) 
        .then((res) => {
        navigate('/profile');
        console.log(res)
        })
        .catch((err) => console.log(err));
        
    }

    

return (
    <div className='main'>
        <video src={clouds} autoPlay loop muted/>
        <Login />
        <div className='content'>
        { !user ? (
            <div>please login first</div>
        ) : ( 
            <div className='quiz'>
                    <span>Question {current +1} / {questions.length}</span>
                    <div className='questions'>
                        {questions[current].question}
                    </div>
                    <div className='answers'>
                    <ButtonGroup vertical>
                    {
                        questions[current].options.length > 0 ? (
                            questions[current].options.map((option) => (
                            <Button
                                className='ansbtn'
                                id={selected === option ? "selected" : "unselected"}
                                key={option}
                                onClick={() => chosenAnswer(option)}
                                value={option}
                            >
                                {option}
                            </Button>
                            ))
                        ) : (
                            null
                        )
                    }
                    </ButtonGroup>
                       {current < questions.length - 1 ? (
                        <div>
                        
                          <Button
                            onClick={() => {handleNext()}}
                          >
                            Next
                          </Button>
                       {errorMessage.length > 0 && <Message color='red'>{errorMessage}</Message>}
                      </div>
                      ) : (
                            <Button
                            type='submit'
                            onClick={(e) => submit(e)}
                            >
                            Submit 
                            </Button>
                       )}
                    
                    </div>
                </div>
        )}
            
        </div>
        
    </div>
        
    
);

};
export default Quiz;
