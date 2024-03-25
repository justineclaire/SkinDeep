import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import Nav from '../components/navbar.js';
import { Button, Dropdown } from 'semantic-ui-react';
import headerbg from '../components/imgs/header.png';
import stars from '../components/imgs/stars.png';
import bg from '../components/imgs/bgg.png';
import glow from '../components/imgs/bubble.png';
import SearchBar from '../components/searchbar.js';

function Home() {

    return (
        <div className='bg-cover' >
            
            <div className="flex flex-col justify-center" >
                <Nav />
            
                <div className="flex flex-col bg-sky justify-center h-screen p-10 w-full justify-center items-center  md:mb-auto bg-cover bg-no-repeat"  style={{backgroundImage: `url(${bg})`, height: '100vh',   backgroundSize: '100%'}}> 

                    <div className='z-40 relative'>
                        <SearchBar />
                    </div>
                    
                    <div className='flex z-0 relative flex-row flex-wrap justify-center items-center'>
                    
                        <Link to="/model" className=''>
                            <div className='flex sm:h-80 sm:w-80 xs:h-50 xs:w-50 text-center items-center justify-center hover:animate-bounce lg:m-4' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%', width: '300px', height: '300px'}}>
                                <h1 className='p-20 text-pretty text-slate-700 xs:text-lg sm:text-3xl '>
                                    Analyse ingredients (with AI)
                                </h1>
                            </div>
                        </Link>

                        <Link to="/quiz">
                            <div className='flex sm:h-80 sm:w-80 xs:h-50 xs:w-50 text-center items-center justify-center hover:animate-bounce lg:m-4' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%', width: '300px', height: '300px'}}>
                                <h3 className='p-20 text-pretty text-slate-700 xs:text-lg sm:text-3xl'>Product recommendations</h3>
                            </div>
                        </Link>
                    </div>
                    
                </div>
             </div>
            </div>
        
    );
};

export default Home;
