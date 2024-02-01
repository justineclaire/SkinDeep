import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../assets/clouds.mp4';
import Login from '../assets/login';

function Home() {

    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <Login />
            <div className='content'>
            <div>
            <h1>Welcome to Skin Deep</h1>
            <p>learn more about your skincare</p>
            <div>
                <button><Link to="/model">Check a product</Link></button>
                <button><Link to="/quiz">Find my skin type</Link></button>
                <button>Learn More</button>
            </div>
            
        </div>
            </div>
        </div>
        
    );
};

export default Home;
