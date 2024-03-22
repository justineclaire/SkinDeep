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
                <div key={index}>
                    <img className="h-auto max-w-xs rounded-lg" src={moisturiser.img} alt="product" />
                    <h3 className="text-right">{moisturiser.Name}</h3>
                    <p className ="text-right">{moisturiser.Brand}</p>
                </div>
            ))
        )}
    </TabPane>) },

        { menuItem: 'Toners', render: () => <TabPane>{toners.map((toner, index) => (
            <div key={index}>
                    <img className="h-auto max-w-xs rounded-lg" src={toner.img} alt="product" />
                    <h3 className="text-right">{toner.Name}</h3>
                    <p className ="text-right">{toner.Brand}</p>
            </div>
        ))}</TabPane> },
        { menuItem: 'Cleansers', render: () => <TabPane>{cleansers.map((cleanser, index) => (
            <div key={index}>
                    <img className="h-auto max-w-xs rounded-lg" src={cleanser.img} alt="product" />
                    <h3 className="text-right">{cleanser.Name}</h3>
                    <p className ="text-right">{cleanser.Brand}</p>
                </div>
        ))}</TabPane> },
        { menuItem: 'Sunscreen', render: () => <TabPane>{sunscreen.map((sunscreen, index) => (
            <div key={index}>
            <img className="h-auto max-w-xs rounded-lg" src={sunscreen.img} alt="product" />
            <h3 className="text-right">{sunscreen.Name}</h3>
            <p className ="text-right">{sunscreen.Brand}</p>
        </div>
        ))}</TabPane> },
        { menuItem: 'Eyecream', render: () => <TabPane>{eyecream.map((cream, index) => (
            <div key={index}>
                    <img className="h-auto max-w-xs rounded-lg" src={cream.img} alt="product" />
                    <h3 className="text-right">{cream.Name}</h3>
                    <p className ="text-right">{cream.Brand}</p>
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
        <Tab panes={panes} />
    );
}

export default Products;