import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


function Search() {

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (search.length > 1) {
            axios.post('http://localhost:8800/search', {search}) 
            .then((res) => {
                setResults(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
        }

        if (search.length === 0) {
            setResults([]);
        }
    }, [search]); 

    return (
        <div className='flex flex-col h-max font-Archivo'>
            <div className='flex flex-row'>
                <input
                    className='p-2 rounded-xl mb-2 mt-60 md:mt-44 lg:mt-80 sm:w-96 px-8 py-5 xs:w-64 bg-blue-100 text-slate-700'
                    placeholder="Search Ingredient info..."
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                <button className='p-2 rounded-xl mb-2 mt-60 md:mt-44 lg:mt-80 px-8 py-5 bg-blue-100 text-slate-700'>
                    Search
                </button>
            </div>
            <ul className=' bg-white rounded-lg divide-y divide-slate-700'>
                {results.slice(0,3).map((result) => (
                    <div className='flex flex-col p-5 hover:bg-amber-100'>
                        <Link 
                             to={`/info/${result.id}/${result.name}/${result.info}`}
                            className='font-text-700' key={result.id}>
                            <h1 className='text-sm'>{result.name}</h1>
                            <p className=' text-xs overflow-hidden w-1/2'>{result.info}</p>
                        </Link>
                    </div>
                ))}
            </ul>
        
    </div>
    );
}

export default Search;