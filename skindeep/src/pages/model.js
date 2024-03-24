import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/navbar';
import Login from  '../components/login';
import bg from '../components/imgs/back.png';
import webpage from '../components/imgs/webpage.png';

export default function Model() {
    const [pred, setPred] = useState(null);
    const [ing, setIng] = useState ({
        ingredients: ''
    });
    const [loading, setLoading] = useState(false);

    const handleClick = async e =>{
        e.preventDefault();
        setLoading(true);
        try {
            console.log("calling the model now", ing)
            //call predictor model
            const response = await axios.post('http://localhost:8800/predict', ing)
            console.log(response.data);
            //parse response
            setPred(processPred(response.data));
            setIng({ ingredients: '' });
        } catch (error) {
            console.log(error);
        }  finally {
            setLoading(false);
        }
    }

    const handleChange = e =>{  
        setIng((prev)=>({...prev, [e.target.name]: e.target.value }));
        //console.log(ing)
    }

    const processPred = (data) => {
        // parse the prediction
       data = data.replace(/[\[\]\r\n]/g,'');
       data = data.split(' ');
       console.log(data);
       data = data.map((item) => {
              if (item === '0') {
                return 'Not suitable';
              } else if (item === '1') {
                return 'Neutral';
              } else if (item === '2') {
                return 'Great!';
              }
       });
       const result = {
        Combination: data[0],
        Dry: data[1],
        Normal: data[2],
        Oily: data[3],
        Sensitive: data[4],
        Acne: data[5],
        age: data[6],
        bright: data[7],
        bh: data[8],
        red: data[9],
        tex: data[10],
        barrier: data[11],
        hyper: data[12],
       }
       return result;
    }  

    const rename = (key) => {
        if(key === 'Combination') {
            return 'combination Skin';
        }
        if(key === 'Dry') {
            return 'dry skin';
        }
        if(key === 'Normal') {
            return 'normal skin';
        }
        if(key === 'Oily') {
            return 'oily skin';
        }
        if(key === 'Sensitive') {
            return 'sensitive skin';
        }
        if(key === 'Acne') {
            return 'acne';
        }
        if(key === 'age') {
            return 'ageing';
        }
        if(key === 'bright') {
            return 'brightening the skin';
        }
        if(key === 'bh') {
            return 'blackheads';
        }
        if(key === 'red') {
            return 'redness';
        }
        if(key === 'tex') {
            return 'textured skin';
        }
        if(key === 'barrier') {
            return 'improving the skin barrier';
        }
        if(key === 'hyper') {
            return 'improving hyperpigmentation';
        }
    }

    return (
        <div className='' >
            <Nav />
            <div className='flex flex-col justify-center items-center font-Archivo text-center sm:text-xl xs:text-lg bg-sky bg-fixed h-screen p-5' style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: 'cover'}} >
                <div className='flex justify-center items-center md:w-2/3 md:h-2/3 mb-auto mt-xs:pt-10  bg-no-repeat bg-center bg-contain rounded-xl'
                        style={{backgroundImage: `url(${webpage})`, marginTop: '5'}}>
                    <form>
                        <div>{loading ? 'Loading...' : ''}</div>
                        <h2>Enter Ingredients for us to analyse</h2>
                        <p>please separate them by commas</p>
                        <input type='text'  
                                className='rounded-lg p-2'
                                placeholder='Ingredients' 
                                name='ingredients' 
                                value={ing.ingredients} 
                                onChange={handleChange} />
                        <button 
                            className='rounded-lg bg-sky p-2 m-2'
                            onClick={handleClick}>
                            Submit
                        </button>
                        

                    </form>
                </div>
                <div>
                <div className='bg-bgpink rounded-lg flex flex-wrap flex-col justify-center items-center'>
                    {pred ? 
                        <>
                            <h2>Analysis:</h2>
                            <p>Based on the ingredients you entered:</p>
                            <table className='w-2/3 mb-5 rounded-lg'>
                                <tr className='w-80 rounded-lg' >
                                    {Object.keys(pred).slice(0, 7).map(key => (
                                        <th className='border-2 border-slate-700' key={key}>{rename(key)}</th>
                                    ))}
                                </tr>
                                <tr className='w-80 rounded-lg'>
                                    {Object.keys(pred).slice(0, 7).map(key => (
                                        <td className='border-2 border-slate-700' key={key}>{pred[key]}</td>
                                    ))}
                                </tr>
                                <tr className='w-80 rounded-lg'>
                                    {Object.keys(pred).slice(7).map(key => (
                                        <th className='border-2 border-slate-700' key={key}>{rename(key)}</th>
                                    ))}
                                </tr>
                                <tr className='w-80 rounded-lg'>
                                    {Object.keys(pred).slice(7).map(key => (
                                        <td className='border-2 border-slate-700' key={key}>{pred[key]}</td>
                                    ))}
                                </tr>
                            </table>
                        </>
                    : ''}
                </div>
                  
                </div>
            </div>
        </div>
    );
};