import React from 'react';
import Timer from './Timer'

export default function GameQuestions(props){
    return(
        <div>
            <Timer/>
            <h1>{props.question}</h1>
            <div><p>{props.answer1}</p></div> 
            <div><p>{props.answer2}</p></div>
            <div><p>{props.answer3}</p></div>
            <div><p>{props.answer4}</p></div>
            <button onClick={props.questionOver}></button>
        </div> 
    )
}