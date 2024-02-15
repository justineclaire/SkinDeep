import React, { useEffect, useState } from 'react';
import clouds from '../components/clouds.mp4';
import { ButtonGroup, Button, Icon, ButtonContent } from 'semantic-ui-react'

function Quiz() {

    const userResponses = {
        skintype: '',
        sensitive: false,
        acne: false,
        age: false,
        bright: false,
        bh: false,
        red: false,
        tex: false,
        barrier: false,
        hyper: false
    };

    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState("");

    const questions = [
        {
            question: "What is your skintype?",
            description: ["If your face feels tight and dry 30 seconds after washing it, you may have dry skin", "If your face feels shiny and makeup tends to 'slide' off you may have oily skin",
        "If your face simultaneously feels dry and tight in some areas but greasy and oily in others (T-zone) you may have combination skin", "If your skin feels hydrated and comfortable, but not oily, you likely have normal skin"],
            options: ["Dry", "Oily", "Combination", "Normal"],
            answer: ''
        },
        {
            question: "Do you have sensitive skin?",
            description: ["Trying new products can break you out or cause red/swollen/itchy skin", "I am generally okay trying out new products"],
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Do you suffer from acne?",
            options: ["Yes - it's bad", "Sometimes - but it isn't my main concern", "No not really"],
            answer: ''
        },
        {
            question: "Is ageing skin a concern for you? Fine lines/wrinkles ",
            description: ["You should really only worry about anti ageing if you are over 22 years old", "I have young skin, it is not a concern for me yet"],
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Do you feel your skin needs brightening? (you want to brighten discolouration caused by acne/sun damage)",
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Are blackheads a problem for you?",
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Is redness a concern for you? your skin needs calming down",
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Do you feel as though your skin needs smoothing?",
            description: ["It is bumpy and the texture could be better", "Nope, it is smooth enough"],
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Do you want to fix your skin barrier? Your skin barrier is a watertight seal that keeps the outermost layers of skin smoothly together",
            description: ["A damaged skin barrier will appear as skin that's rough, dry, or flaky", "When these outer layers are healthy, skin feels soft, supple and plump"],
            options: ["Yes", "No not really"],
            answer: ''
        },
        {
            question: "Is hyperpigmentation a concern for you? Hyperpigmentation is a harmless skin condition which is characterised by patches of skin appearing much darker than a person's overall skin tone",
            options: ["Yes", "No not really"],
            answer: ''
        }
    ]

    function chosenAnswer(e) {
        e.preventDefault();
        setAnswer(e.target.value)
        questions[current].answer = answer;
        console.log(e.target.value)
        console.log(questions[current].answer)
    }

    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <div className='content'>
                <div className='quiz'>
                    <span>Question {current +1} / {questions.length}</span>
                    <div className='questions'>
                        {questions[current].question}
                    </div>
                    <div className='answers'>
                    <ButtonGroup vertical>
                        {questions[current].options.map((option) => {
                          return ( <Button className='ansbtn' 
                            key={option}
                            onClick={chosenAnswer}
                            value={option}
                            >
                                {option}
                            </Button>

                        );
                        })}
                       <Button animated /*onClick={handleAnswer(option)}*/>
                            <ButtonContent visible>Next</ButtonContent>
                            <ButtonContent hidden>
                                <Icon name='arrow right' />
                            </ButtonContent>
                        </Button>
                    </ButtonGroup>
                    </div>
                </div>
            </div>
            
        </div>
           
        
    );
};

export default Quiz;
