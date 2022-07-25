import React from 'react';
import Button from 'react-bootstrap/Button';

const HeaderNotLogged = (props) => {

    console.log("HeaderNotLogged props:", props);

    function Redirect() {
        console.log("redirect clicked..");
        window.location.replace('https://localhost:3000');
    }

    return (
        <div>
           <Button variant="primary" onClick={Redirect}>Log in to Zoombies NFT World</Button>
        </div>
    )
}

export default HeaderNotLogged;