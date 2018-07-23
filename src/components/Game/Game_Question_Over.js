import React from 'react';

export default function GameQuestionOver(props){
    return(
        <div>
           Question OVER
           <button onClick={props.nextQuestion}>Next Question</button>
        </div> 
    )
}