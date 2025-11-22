import React from "react";
import './Welcome.css';

function Welcome({name}) {
    return (
        <div className='Welcome'>
            <h2>{name}</h2>
        </div>
    );
};

export default Welcome;