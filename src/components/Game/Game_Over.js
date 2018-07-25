import React from 'react';
import {Link} from 'react-router-dom';
export default function GameOver(props){
    console.log(props)
    return(
        <div>
            <h1>Game Over</h1>
            <p>1st Place: {props.leaderboard[0].name}</p>
            <p>2nd Place: {props.leaderboard[1].name}</p>
            <p>3rd Place: {props.leaderboard[2].name}</p>
            <Link to='/host'>Start a new Game?</Link>
        </div> 
    )
}