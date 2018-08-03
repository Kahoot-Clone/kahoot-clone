import React from 'react';
import {Link} from 'react-router-dom';
import Zoom from '../../components/animations/zoomin.js';

export default function GameOver(props){
    console.log(props)
    return(
        <div>
            <Zoom/>
            <h1>Game Over</h1>
            <p>1st Place: {props.leaderboard[0].name}</p>
            <p>2nd Place: {props.leaderboard[1].name}</p>
            <p>Last Place: {props.leaderboard[props.leaderboard.length()-1].name}</p>
            <Link to='/host'>Start a new Game?</Link>
        </div> 
    )
}