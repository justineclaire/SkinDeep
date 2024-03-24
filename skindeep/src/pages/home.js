import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import Search from '../components/navbar';
import { Button } from 'semantic-ui-react';
import headerbg from '../components/imgs/header.png';
import stars from '../components/imgs/stars.png';
import bg from '../components/imgs/bgg.png';
import glow from '../components/imgs/bubble.png';

function Home() {

    return (
        <div className='bg-cover' >
            
            <div className="flex flex-col justify-center" >
                <Search />
            
                <div className="flex flex-row xs:flex-wrap bg-sky sm:flex-nowrap h-screen p-10 w-full justify-center items-center md:px-40 lg:mt-auto bg-cover bg-no-repeat"  style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: '100%'}}> 

                    
                    <Link to="/model" className=''>
                        <div className='flex sm:h-80 sm:w-80 xs:h-40 xs:w-40 text-center items-center justify-center hover:animate-bounce lg:m-10 lg:mt-40' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%'}}>
                            <h3 className='font-light font-Valera p-20 text-pretty text-slate-700 xs:text-sm sm:text-3xl '>
                                Analyse ingredients (with AI)
                            </h3>
                        </div>
                    </Link>
                    
                    <Link to="/quiz">
                        <div className='flex sm:h-80 sm:w-80 xs:h-40 xs:w-40 text-center items-center justify-center hover:animate-bounce lg:m-10 lg:mt-40' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%'}}>
                            <h3 className='font-light font-Valera p-20 text-pretty text-slate-700 xs:text-sm sm:text-3xl'>Product recommendations</h3>
                        </div>
                    </Link>
                    
                    {/*<Link to="/number3">
                        <div className='flex bg-pink-100 justify-center items-center rounded-lg hover:animate-bounce shadow-black shadow-lg my-5 sm:m-10' style={{backgroundImage: `url(${stars})`, backgroundSize: '80%'}}>
                            <h3 className='font-light p-5 mx-5 xs:text-xs sm:text-s md:p-15 md:text-base lg:p-20'>Search Ingredients</h3>
                        </div>
    </Link          >*/}
                </div>
             </div>
            </div>
        
    );
};

export default Home;
