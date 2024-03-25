import React, {useState, useEffect} from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';

function Products() {


    const panes = [
        { menuItem: 'Moisturisers', render: () => (<TabPane>
        {loading ? (
            <div>Loading...</div>
        ) : (
            moisturisers.map((moisturiser, index) => (
                <div key={index} className='flex flex-wrap items-center divide-y divide-slate-300 rounded-xl bg-green-100 text-right p-5 xs:text-xs'>
                    <img className="xs:h-24 sm:h-44 m-5 border-2 border-gray-300 rounded-xl bg-white" src={moisturiser.img} alt="product" />
                    <div className='flex flex-col xs:text-center ml-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold mb-2">{moisturiser.Name}</h3>
                        <p className ="text-gray-800 mt-2">{moisturiser.Brand}</p>
                        <button className='sm:w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'>Learn More</button>    
                    </div>
                </div>
                
            ))
        )}
    </TabPane>) },

        { menuItem: 'Toners', render: () => <TabPane>{toners.map((toner, index) => (
            <div key={index}>
                   <div key={index} className='flex flex-wrap items-center divide-y divide-slate-300 rounded-xl bg-orange-100 text-right p-5 xs:text-xs'>
                    <img className="xs:h-24 sm:h-44 m-5 border-2 border-gray-300 rounded-xl bg-white" src={toner.img} alt="product" />
                    <div className='flex flex-col xs:text-center ml-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold mb-2">{toner.Name}</h3>
                        <p className ="text-gray-800 mt-2">{toner.Brand}</p>
                        <button className='sm:w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'>Learn More</button>    
                    </div>
                </div>
            </div>
        ))}</TabPane> },
        { menuItem: 'Cleansers', render: () => <TabPane>{cleansers.map((cleanser, index) => (
            <div key={index}>
                    <div key={index} className='flex flex-wrap items-center divide-y divide-slate-300 rounded-xl bg-purple-100 text-right p-5 xs:text-xs'>
                    <img className="xs:h-24 sm:h-44 m-5 border-2 border-gray-300 rounded-xl bg-white" src={cleanser.img} alt="product" />
                    <div className='flex flex-col xs:text-center ml-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold mb-2 break-words">{cleanser.Name}</h3>
                        <p className ="text-gray-800 mt-2">{cleanser.Brand}</p>
                        <button className='sm:w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'>Learn More</button>    
                    </div>
                </div>
            </div>
        ))}</TabPane> },
        { menuItem: 'Sunscreen', render: () => <TabPane>{sunscreen.map((sunscreen, index) => (
            <div key={index}>
                <div key={index} className='flex flex-wrap items-center divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                    <img className="xs:h-24 sm:h-44 m-5 border-2 border-gray-300 rounded-xl bg-white" src={sunscreen.img} alt="product" />
                    <div className='flex flex-col xs:text-center ml-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold mb-2">{sunscreen.Name}</h3>
                        <p className ="text-gray-800 mt-2">{sunscreen.Brand}</p>
                        <button className='sm:w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'>Learn More</button>    
                    </div>
                </div>
            </div>
        ))}</TabPane> },
        { menuItem: 'Eyecream', render: () => <TabPane>{eyecream.map((cream, index) => (
            <div key={index}>
                <div key={index} className='flex flex-wrap items-center divide-y divide-slate-300 rounded-xl bg-webpink text-right p-5 xs:text-xs'>
                    <img className="xs:h-24 sm:h-44 m-5 border-2 border-gray-300 rounded-xl bg-white" src={cream.img} alt="product" />
                    <div className='flex flex-col xs:text-center ml-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold mb-2">{cream.Name}</h3>
                        <p className ="text-gray-800 mt-2">{cream.Brand}</p>
                        <button className='sm:w-64 h-12 bg-webpink text-slate-700 hover:bg-pink-600 rounded-xl'>Learn More</button>    
                    </div>
                </div>
            </div>
        ))}</TabPane>},
      ]

    const [user, setUser] = useState({});
    const [uid, setUid] = useState("");
    const [recList, setRecList] = useState([]);
    const [moisturisers, setMoisturisers] = useState([]);
    const [toners, setToners] = useState([]);
    const [cleansers, setCleansers] = useState([]);
    const [sunscreen, setSunscreen] = useState([]);
    const [eyecream, setEyecream] = useState([]);
    const [quiztaken, setQuizTaken] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUid(currentUser.uid);
            setUser(currentUser);
            
            if(currentUser === null) {
                setUser(null);
            }
        });

        
        return unsubscribe;
    }, []); 
   
    useEffect(() => {
        try {
            if(user.uid) {
                axios.get(`http://localhost:8800/user/${uid}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setQuizTaken(true);
                        console.log(uid)
                    } else {
                        setQuizTaken(false);
                    }
                    
                })
            }
        } catch (error) {
            console.log(error);
            console.log("ahhh axios error with user");
        }
        
    }, [user]); 
   

    useEffect(() => {
        try {
            if(quiztaken && user) {                
                try{
                    axios.get(`http://localhost:8800/recs/${uid}`)
                    .then(recs => {
                        setRecList(recs.data);
                        
                    })
                }catch(error) {
                    console.log("ahhh recs axios error");
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }, [user, quiztaken]); 

    useEffect(() => {
        if (recList.length > 0) {
            filter();
            
        }
    }, [recList]);

    const filter = () => {
        
        let nois = recList.filter((prod) => { return prod.Label === "Moisturizer"});
        setMoisturisers(nois.slice(0, 5)); 

        let tone = recList.filter((prod) => { return prod.Label === "Toner"});
        setToners(tone.slice(0, 5));

        let cleanse = recList.filter((prod) => { return prod.Label === "Cleanser"});
        setCleansers(cleanse.slice(0, 5));

        let sun = recList.filter((prod) => { return prod.Label === "Sun protect"});
        setSunscreen(sun.slice(0, 5));

        let eye = recList.filter((prod) => { return prod.Label === "Eye cream"});
        setEyecream(eye.slice(0, 5));

        setLoading(false);
       
       
    }

    
    return( 
       
            <div className='font-Archivo p-3 rounded-xl flex justify-center items-center'>
                <div className='h-[475px] overflow-auto bg-webpink p-4 rounded-xl'>
                    <Tab panes={panes} />
                </div>
            </div>
        
    );
}

export default Products;