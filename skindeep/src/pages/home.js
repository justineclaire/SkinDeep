import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navbar.js';
import bg from '../components/imgs/back.png';
import glow from '../components/imgs/bubble2.png';
import logo from '../components/imgs/bubblelogo.png';

function Home() {

    return (
        <div className='' >
            
            <div className="flex flex-col justify-center" >
               
            
                <div className='flex flex-col justify-center items-center font-Archivo text-center bg-white bg-fixed h-screen p-5 overscroll-contain' style={{backgroundImage: `url(${bg})`, height: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} >
                <Nav />
               <div className=''>
                        <img className=''src={logo} alt="Skin deep" />
                        
                    </div>
                    
                    <div className='flex flex-row flex-wrap justify-center items-center'>
                    
                        <Link to="/model" className=''>
                            <div className='flex sm:h-80 sm:w-80 xs:h-40 xs:w-40 text-center items-center justify-center hover:animate-bounce lg:m-4' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%', width: '300px', height: '300px'}}>
                                <h1 className='text-pretty font-ggoodfood text-white xs:text-base sm:text-3xl '>
                                    Analyse ingredients (with AI)
                                </h1>
                            </div>
                        </Link>

                        <Link to="/quiz">
                            <div className='flex sm:h-80 sm:w-80 xs:h-50 xs:w-50 text-center items-center justify-center hover:animate-bounce lg:m-4' style={{backgroundImage: `url(${glow})`, backgroundSize: '100%', width: '300px', height: '300px'}}>
                                <h3 className=' text-pretty font-ggoodfood text-white xs:text-base sm:text-2xl'>Product recommendations + skincare quiz</h3>
                            </div>
                        </Link>
                    </div>
                    
                </div>
             </div>
            </div>
        
    );
};

export default Home;
