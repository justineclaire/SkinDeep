import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';
import Search from '../components/searchbar';
import { Button } from 'semantic-ui-react';
import headerbg from '../components/imgs/headerbg.png';

function Home() {

    return (
        <div className='main'>
            
        
            <div className="flex flex-col" /*style={{backgroundImage: `url(${headerbg})`, height: '100vh', width: '100%'}}*/>
                <Search />
                <div className='flex flex-row justify-center'>
                    <img src={headerbg} alt="background" className="w-1/3 h-full" />
                </div>
            
                <div className="bg-blue-100" style={{ height: '20vh', width: '100%'}}> 
                <Button><Link to="/model">Check a product</Link></Button>
                <Button><Link to="/quiz">Find my skin type</Link></Button>
                <Button>Search by Ingredient</Button>
             </div>
            </div>
           
            
            
            
        </div>
        
    );
};

export default Home;
