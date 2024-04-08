import React, { useState } from 'react';
import axios from 'axios';
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
                return 'Not suitable ❌';
              } else if (item === '1') {
                return 'Neutral 🙂';
              } else if (item === '2') {
                return 'Great! ✅';
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
            
            <div className='flex flex-col justify-center items-center font-Archivo text-center sm:text-xl xs:text-lg bg-white bg-fixed h-screen p-5 overscroll-contain' style={{backgroundImage: `url(${bg})`, height: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
            <Nav />
                <div className={` ${pred ? '' : 'mb-64'} flex xs:justify-start sm:justify-center items-center sm:w-full h-full  md:mt-5  sm:pt-10 pb-3 bg-no-repeat bg-center bg-contain rounded-xl bg-none-xs`} 
                        style={{backgroundImage: `url(${webpage})`, marginTop: '5'}}>
                    <form className='p-10 flex flex-col items-center justify-center xs:w-full sm:w-2/3 mt-5'>
                      
                        <h2 className='xs:text-base sm:text-base md:text-xl text-wrap w-1/2 lg:w-1/3'>Enter the Ingredients list of a product for us to analyse</h2>
                        <p className='xs:text-base sm:text-sm text-wrap md:text-md lg:text-lg w-1/2 lg:w-1/3'>please separate them by commas (and we'll tell you what the product is good or bad for)</p>
                        <input type='text'  
                                className='rounded-lg xs:p-1 sm:p-2 w-1/3 lg:w-1/4 xs:text-sm sm:text-base md:text-md lg:text-lg '
                                placeholder='Ingredients' 
                                name='ingredients' 
                                value={ing.ingredients} 
                                onChange={handleChange} />
                              <>
                        {loading ? (
                            <button 
                                className='rounded-lg bg-red-300 text-white xs:p-1 sm:p-2 sm:m-2 xs:text-xs sm:text-sm md:text-md lg:text-lg'>
                                Loading
                            </button>
                            ): (
                            <button 
                                className='rounded-lg bg-sky xs:p-1 sm:p-2 sm:m-2 xs:text-xs sm:text-sm md:text-md lg:text-lg'
                                onClick={handleClick}>
                                Submit
                            </button>)}
                        </>
                        

                    </form>
                </div>
                <div className='flex flex-row flex-wrap justify-center items-center mt-5'>
                    
                    
                        {pred ? 
                            <>
                            <div className=' flex flex-col justify-center items-center w-5/6 bg-white rounded-xl p-5'> 
                            
                                <div className=' rounded-xl flex flex-wrap flex-col justify-center items-center sm::w-1/3 xs:w-full'>
                                    <h2 className='sm:text-base md:text-xl'>Prediction Results:</h2>
                                        <p className='xs:text-xs sm:text-sm md:text-md lg:text-lg'>Based on the ingredients you entered, our machine thinks this  product is:</p>
                                        <div className='flex flex-wrap w-full justify-center items-center sm:px-5 pb-2 sm:mt-2'>
                                            {Object.keys(pred).map(key => (
                                                <div className='flex w-full xs:w-1/2 sm:w-1/4 lg:w-1/6 xl:w-1/5 2xl:w-1/6 justify-center items-center'>
                                                    <div className='border-2 border-slate-700 bg-bgpink p-2 rounded-lg divide-slate-700 divide-y xs:w-full sm:w-80 h-35'>
                                                        <h3 className='text-center xs:text-lg sm:text-xl '>{rename(key)}</h3>
                                                        <p className='text-center xs:text-lg sm:text-md pt-2'>{pred[key]}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                </div>
                            </div>
                            </>
                        : ''}
                    </div>
               
                  
                </div>
           
        </div>
    );
};