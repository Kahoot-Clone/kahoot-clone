import React from 'react';

export default function PlayerQuestion(props){
    return (
        <div>
            <div onClick={() => props.submitAnswer(1)}>1</div> 
            <div onClick={() => props.submitAnswer(2)}>2</div> 
            <div onClick={() => props.submitAnswer(3)}>3</div> 
            <div onClick={() => props.submitAnswer(4)}>4</div> 
        </div> 
    )
}