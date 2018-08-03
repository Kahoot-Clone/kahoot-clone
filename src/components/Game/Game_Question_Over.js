import React from 'react';
import GameOver from './Game_Over'
import '../Host/Host.css';
import './Game.css';

export default function GameQuestionOver(props){
    return(
        <div>
            {!props.lastQuestion ?
            <div className='question-over-wrapper' >
                <div className='center' >
                    <h1 className='player-name'>Question Over</h1>
                </div> 
                <div className='center' >
                <button className='btn-new' onClick={props.nextQuestion}>Next Question</button>
                </div>   
            </div> 
            :
            <GameOver leaderboard={props.leaderboard}/>
        }
        </div>
    )
}