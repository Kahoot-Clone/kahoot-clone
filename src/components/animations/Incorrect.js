import React from 'react';
import './animate.css';
import IncorrectPath from '../../Assests/incorrect-path.js';

export default function Incorrect(){
    return(
        <div className='check-wrapper' >
            {IncorrectPath}
        </div> 
    )
}