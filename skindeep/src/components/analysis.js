import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import heart from './imgs/heart.png';

function Analysis({ cream, openModal }) {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/ings`, {id: cream.id}) 
        .then((res) => {
            setResults(res.data);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
        
    }, []);

    useEffect(() => { 
        if (results.length > 0) {
            setLoading(false);
      }
      console.log(results);
    }, [results]);

    return (
        <>
          
          <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-5/6 my-6 mx-auto ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                     This product contains some of the following ingredients:
                    </h3>
                    {loading ? <h1>Loading...</h1> : <>
                        
                        <ul className='overflow-auto h-96 w-full bg-sky rounded-xl'>
                            {results.map((ing) => {
                                return <div key={ing.key} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-white text-right p-5 xs:text-xs'>
                                    
                                <li className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                                        <h3 className=" xs:text-lg sm:text-xl font-semibold ">{ing.name}</h3>
                                        <p className ="text-gray-800 ">{ing.info}</p>  
                                    </li>
                                    
                                </div>
                            })}
                        </ul>
                        </>}
                    
                    
                  </div>
                  {/*body*/}
                 
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    
                    <button className='flex flex-row px-2 py-4 border-2 text-white tracking-wide justify-between items-center h-full rounded-lg bg-blue-600 hover:bg-pink-600' type="button"
                        onClick={() => openModal()}><img className='h-10 w-10 xs:h-4 xs:w-4'src={heart} />
                        <span className='font-Archivo px-3 xs:px-0'>
                           close </span>
                           <img className='h-10 w-10 xs:h-4 xs:w-4'src={heart} /></button>
                      
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          
      
          
    );

}

export default Analysis;