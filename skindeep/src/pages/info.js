import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/navbar';
import Login from  '../components/login';
import bg from '../components/imgs/back.png';
import { useParams } from "react-router-dom";
import webpage from '../components/imgs/webpage.png';
import bubble from '../components/imgs/bubblesquare.png';


function Info() {

    let { id, name, info } = useParams();
    const [prods, setProds] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8800/prods', {id: id}) 
        .then((res) => {
            setProds(res.data);
            //console.log(res.data);
        })
        .catch((err) => console.log(err));
        
    }, []);
    
   

    return (
        <div className='' >
            <Nav />
            <div className='flex flex-col justify-center items-center font-Archivo text-center sm:text-xl xs:text-lg bg-sky bg-fixed h-screen p-5 overscroll-contain' style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: 'cover'}} >
                <div className='flex justify-center items-center rounded-xl bg-none-xs'>
                        <div className='flex flex-col w-5/6 p-4 rounded-2xl border-dashed border-8 border-webpink bg-white m-auto'>
                            <div className='flex flex-col mb-5'>
                                <h1>{name}</h1>
                                <p>{info}</p>
                            </div>
                            
                            {prods.length > 0 ? (
                                <div className='p-2 pt-5 justify-left rounded-xl overflow-auto'>
                                <h3>Some products containing {name} are:</h3>
                                <ul className='overflow-auto h-96 w-full bg-sky rounded-xl'>
                                    {prods.slice(0, 10).map((prod) => (
                                         <div className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                                         <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={prod.img} alt="product" />
                                         <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                                             <h3 className=" xs:text-lg sm:text-xl font-semibold ">{prod.Name}</h3>
                                             <p className ="text-gray-800 ">{prod.Brand}</p>  
                                         </div>
                                     </div>
                                    ))}
                                </ul>
                            </div>
                            ) : null}
                        </div>

                        
                </div>
            </div>
           
        </div>
    );
};

export default Info;