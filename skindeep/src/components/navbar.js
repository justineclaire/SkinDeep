import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import Login from './login';
import logo from '../components/imgs/bubblelogo.png';
import SearchBar from './searchbar.js';

function Nav() {
    return (
        <nav className="w-full font-ggoodfood">
        <div id="search" className="flex flex-wrap items-center sm:justify-between xs:justify-center mx-auto p-4">
            <div className='flex flex-row flex-wrap sm:justify-between xs:justify-center'>
                <Link className='bg-pink-600 bg-no-repeat p-2 rounded-2xl hover:bg-pink-100' to="/home">
                <svg class="h-12 w-12 text-slate-100"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
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