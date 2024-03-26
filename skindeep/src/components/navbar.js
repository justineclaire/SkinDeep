import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import Login from './login';
import logo from '../components/imgs/bubblelogo.png';
import SearchBar from './searchbar.js';

function Nav() {
    return (
        <nav className="bg-webpink w-full font-ggoodfood">
        <div id="search" className="flex flex-wrap items-center sm:justify-between xs:justify-center mx-auto p-4">
            <div className='flex flex-row flex-wrap sm:justify-between xs:justify-center'>
                <Link className='bg-pink-700 bg-no-repeat p-2 rounded-2xl' to="/home">
                    <img className='h-20 xs:h-10 rounded-lg' src={logo} alt='home button logo' />
                </Link>
                <SearchBar />
            </div>
            <div>
                <Login />
            </div>
        </div>
        </nav>
    )

};

export default Nav;