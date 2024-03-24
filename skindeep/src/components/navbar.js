import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { Button, Icon } from 'semantic-ui-react'
import Login from './login';
import logo from '../components/imgs/header2.png';

function Nav() {
    return (
        <nav class="bg-gradient-to-l from-white to-pink-300 w-full">
        <div id="search" className="flex flex-wrap items-center sm:justify-between xs:justify-center mx-auto p-4">
                <Link to="/home">
                    <img className='h-20 xs:h-10 rounded-lg' src={logo} alt='home button logo' />
                </Link>
            <Login />
        </div>
        </nav>
    )

};

export default Nav;