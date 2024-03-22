import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search from '../components/searchbar';
import Login from  '../components/login';
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

    return (
        <div className='main'>
            <Login />
            <Search />
            <div className='content'>
            <form>
                <div>{loading ? 'Loading...' : ''}</div>
                <h2>Enter Ingredients for us to analyse</h2>
                <p>please separate them by commas</p>
                <input type='text' placeholder='Ingredients' name='ingredients' value={ing.ingredients} onChange={handleChange} />
                <button onClick={handleClick}>Submit</button>
                <div>
                    {pred && Object.keys(pred).map(key => (
                    <div key={key}>
                        {key}: {pred[key]}
                    </div>
                    ))}
                </div>

            </form>
            </div>
        </div>
    );
};