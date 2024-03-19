import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { Button, Icon } from 'semantic-ui-react'

function Search() {
    return (
        <div id="search" class="ui right aligned category search">
            <Button icon id="homebtn">
                <Link to="/home">
                <Icon name='home' />
                </Link>
            </Button>
        <div class="ui icon input">
            <input class="prompt" type="text" placeholder="Search ingredients/products..."/>
            <i class="search icon"></i>
        </div>
        <div class="results"></div>
        </div>
    )

};

export default Search;