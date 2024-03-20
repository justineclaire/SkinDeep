import React, {useState, useEffect} from 'react'
import { TabPane, Tab } from 'semantic-ui-react'
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../firebase";  
import axios from 'axios';

function Products() {

    const panes = [
        { menuItem: 'Moisturisers', render: () => <TabPane>{moisturisers.map((moisturiser, index) => (
            <div key={index}>
                
                <h3 class="id">{moisturiser.Name}</h3>
                <p class ="brand">{moisturiser.Brand}</p>
                
            </div>
        ))}</TabPane> },



        { menuItem: 'Toners', render: () => <TabPane>{toners.map((toner, index) => (
            <div key={index}>
                
                <h3 class="id">{toner.Name}</h3>
                <p class ="brand">{toner.Brand}</p>
                
            </div>
        ))}</TabPane> },
        { menuItem: 'Cleansers', render: () => <TabPane>{cleansers.map((cleanser, index) => (
            <div key={index}>
                
                <h3 class="id">{cleanser.Name}</h3>
                <p class ="brand">{cleanser.Brand}</p>
                
            </div>
        ))}</TabPane> },
        { menuItem: 'Sunscreen', render: () => <TabPane>{sunscreen.map((sunscreen, index) => (
            <div key={index}>
                
                <h3 class="id">{sunscreen.Name}</h3>
                <p class ="brand">{sunscreen.Brand}</p>
                
            </div>
        ))}</TabPane> },
        { menuItem: 'Eyecream', render: () => <TabPane>{eyecream.map((cream, index) => (
            <div key={index}>
                
                <h3 class="id">{cream.Name}</h3>
                <p class ="brand">{cream.Brand}</p>
                
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUid(currentUser.uid);
            setUser(currentUser);
            
            if(currentUser === null) {
                setUser(null);
            }
        });

        // Return the unsubscribe function to clean up the subscription
        return unsubscribe;
    }, []); 
   
    useEffect(() => {
        try {
            if(user) {
                axios.get(`http://localhost:8800/user/${uid}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setQuizTaken(true);
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
                    axios.get(`http://localhost:8800/recs/${user.uid}`)
                    .then(recs => {
                        setRecList(recs.data);
                        filter();
                    })
                }catch(error) {
                    console.log("ahhh recs axios error");
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }, [user, quiztaken]); 

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
       
    }
     
    useEffect(() => {
        //console.log(moisturisers);
    }, [moisturisers]);
    return( 
        <Tab panes={panes} />
    );
}

export default Products;