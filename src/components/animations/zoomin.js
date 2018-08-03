import React from 'react';
import Jeremy from './jerm.png';
import zoom from './jerm-zoom.png';
import './animate.css';


export default function Zoomin(){
    return (
        <div  className=''>
            <img src={Jeremy} height='400px'className='jeremy'/>
            <img src={zoom} height='550px' className='zoom'/>
        </div> 
    )
}