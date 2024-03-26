import React, {useState, useEffect} from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';
import Analysis from './analysis';

function Products() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCream, setSelectedCream] = useState(null);

    const openModal = (cream) => {
        setSelectedCream(cream);
        setModalOpen(!modalOpen);
    };


    const panes = [
        { menuItem: 'Moisturisers', render: () => (<TabPane>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <ul className='overflow-auto h-max w-full bg-sky rounded-xl'>
            {moisturisers.map((cream, index) => (
                    <div key={index} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                    <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={cream.img} alt="product" />
                    <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold ">{cream.Name}</h3>
                        <p className ="text-gray-800 ">{cream.Brand}</p>
                        <button onClick={() => openModal(cream)} className='bg-pink-700 w-1/2 text-white rounded-lg p-2'>More Info</button>  
                    </div>
                </div>
            ))
            }
        </ul>)}{modalOpen && <Analysis cream={selectedCream}  openModal={openModal} />}
    </TabPane>) },

        { menuItem: 'Toners', render: () => <TabPane>
            <ul className='overflow-auto h-max w-full bg-sky rounded-xl'>
            {toners.map((cream, index) => (
                    <div key={index} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                    <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={cream.img} alt="product" />
                    <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold ">{cream.Name}</h3>
                        <p className ="text-gray-800 ">{cream.Brand}</p>  
                        <button onClick={() => openModal(cream)} className='bg-pink-700 w-1/2 text-white rounded-lg p-2'>More Info</button>  
                    </div>
                </div>
            ))}
        </ul>{modalOpen && <Analysis cream={selectedCream}  openModal={openModal} />}
            </TabPane> },
        { menuItem: 'Cleansers', render: () => <TabPane>
            <ul className='overflow-auto h-max w-full bg-sky rounded-xl'>
            {cleansers.map((cleanser, index) => (
                    <div key={index} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                    <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={cleanser.img} alt="product" />
                    <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold ">{cleanser.Name}</h3>
                        <p className ="text-gray-800 ">{cleanser.Brand}</p>  
                        <button onClick={() => openModal(cleanser)} className='bg-pink-700 w-1/2 text-white rounded-lg p-2'>More Info</button>  
                    </div>
                </div>
            ))}
        </ul>{modalOpen && <Analysis cream={selectedCream}  openModal={openModal} />}
            </TabPane> },
        { menuItem: 'Sunscreen', render: () => <TabPane>
                <ul className='overflow-auto h-max w-full bg-sky rounded-xl'>
                    {sunscreen.map((sunscreen, index) => (
                            <div key={index} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                            <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={sunscreen.img} alt="product" />
                            <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                                <h3 className=" xs:text-lg sm:text-xl font-semibold ">{sunscreen.Name}</h3>
                                <p className ="text-gray-800 ">{sunscreen.Brand}</p> 
                                <button onClick={() => openModal(sunscreen)} className='bg-pink-700 w-1/2 text-white rounded-lg p-2'>More Info</button>   
                            </div>
                        </div>
                    ))}
                </ul>
                {modalOpen && <Analysis cream={selectedCream}  openModal={openModal} />}
            
        </TabPane> },
        { menuItem: 'Eyecream', render: () => <TabPane>
            <ul className='overflow-auto h-max w-full bg-sky rounded-xl'>
            {eyecream.map((cream, index) => (
                    <div key={index} className='flex flex-row flex-wrap items-center xs:justify-center m-5 divide-y divide-slate-300 rounded-xl bg-cyan-100 text-right p-5 xs:text-xs'>
                    <img className=" border-2 h-24 w-24 border-gray-300 rounded-xl bg-white" src={cream.img} alt="product" />
                    <div className='flex flex-col w-3/4 xs:text-center sm:text-left mx-5 p-5'>
                        <h3 className=" xs:text-lg sm:text-xl font-semibold ">{cream.Name}</h3>
                        <p className ="text-gray-800 ">{cream.Brand}</p>  
                        <button onClick={() => openModal(cream)} className='bg-pink-700 w-1/2 text-white rounded-lg p-2'>More Info</button>  
                    </div>
                </div>
            ))}
        </ul>{modalOpen && <Analysis cream={selectedCream}  openModal={openModal} />}
        </TabPane>},
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
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${uid}`)
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
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/recs/${uid}`)
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
                <div className='sm:h-[475px] w-full overflow-auto bg-webpink p-4 rounded-xl overspill-contain'>
                    <Tab className='flex flex-row flex-wrap' panes={panes} />
                </div>
            </div>
        
    );
}

export default Products;