import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../components/clouds.mp4';
import Login from '../components/login';
import Search from '../components/searchbar';
import { Button } from 'semantic-ui-react';

function Home() {

    return (
        <div className='main'>
            {/*<video src={clouds} autoPlay loop muted/>*/}
            <Search />
            <Login />
            <div className='content'>
            <div>
            <h1>Welcome to Skin Deep</h1>
            <p>learn more about your skincare</p>
            <div>
                <Button><Link to="/model">Check a product</Link></Button>
                <Button><Link to="/quiz">Find my skin type</Link></Button>
                <Button>Search by Ingredient</Button>
            </div>
            
        </div>
            </div>
        </div>
        
    );
};

export default Home;
