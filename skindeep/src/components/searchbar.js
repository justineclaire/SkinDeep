import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { Button, Icon } from 'semantic-ui-react'
import Login from '../components/login';
import logo from '../components/imgs/logo.png';

function Search() {
    return (
        <nav class="bg-pink-200 divide-gray-400 dark:bg-gray-900">
        <div id="search" className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <button  className='px-5'>
                <Link to="/home">
                    <img className='h-20 rounded-lg' src={logo} alt='home btn logo' />
                </Link>
            </button>
            <Login />
        
        </div>
        </nav>
    )

};

export default Search;