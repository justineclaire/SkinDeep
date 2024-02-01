import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clouds from '../assets/clouds.mp4';

function Quiz() {

    return (
        <div className='main'>
            <video src={clouds} autoPlay loop muted/>
            <div className='content'>
                <form id='checkboxes'>
                    <label for="combination">Combination
                        <input type="checkbox" id="combination" name="combination" value="combination"/>
                    </label>

                    <label for="dry">Dry
                        <input type="checkbox" id="dry" name="dry" value="dry"/>
                    </label>

                    <label for="normal">Normal
                        <input type="checkbox" id="normal" name="normal" value="normal"/>
                    </label>

                    <label for="oily">Oily
                        <input type="checkbox" id="oily" name="oily" value="oily"/>
                    </label>

                    <label for="sensitive">Sensitive
                        <input type="checkbox" id="sensitive" name="sensitive" value="sensitive"/>
                    </label>

                    <label for="acne">Acne
                        <input type="checkbox" id="acne" name="acne" value="acne"/>
                    </label>

                    <label for="age">Ageing
                        <input type="checkbox" id="age" name="age" value="age"/>
                    </label>

                    <label for="bright">Dullness/dark spots
                        <input type="checkbox" id="bright" name="bright" value="bright"/>
                    </label>

                    <label for="bh">Blackheads
                        <input type="checkbox" id="bh" name="bh" value="bh"/>
                    </label>

                    <label for="red">Redness
                        <input type="checkbox" id="red" name="red" value="red"/>
                    </label>

                    <label for="tex">Textured skin
                        <input type="checkbox" id="tex" name="tex" value="tex"/>
                    </label>

                    <label for="barrier">Damaged skin barrier
                        <input type="checkbox" id="barrier" name="barrier" value="barrier"/>
                    </label>

                    <label for="hyper">Hyperpigmentation
                        <input type="checkbox" id="hyper" name="hyper" value="hyper"/>
                    </label>
                    
                    <button type='submit'>Recommend me products!</button>
                </form>
            </div>
            
        </div>
           
        
    );
};

export default Quiz;
