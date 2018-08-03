import React from 'react';
import {Link} from 'react-router-dom';
import Zoom from '../../components/animations/zoomin.js';
import './Game.css';


export default function GameOver(props){
    return(
        <div className='game-over'>
            <Zoom/>
            <h1 className='leaderBoard-title'>Game Over</h1>
            <br/>
            <h2 className='leaderBoard'>1st Place: {props.leaderboard[0].name}</h2>
            <h2 className='leaderBoard'>2nd Place: {props.leaderboard[1].name}</h2>
            <h2 className='leaderBoard'>Last Place: {props.leaderboard.pop().name}</h2>
            <br/>
            <Link to='/host'>
            <button className='btn-newGame'>
            Start a new Game?
            </button>
            </Link>
        </div> 
    )
}