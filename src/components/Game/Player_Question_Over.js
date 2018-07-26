import React from 'react';
// import check from '../../Assests/kwizz-check.svg';
import x from '../../Assests/kwizz-x.svg';
import Check from '../animations/Check.js'

export default function PlayerQuestionOver(props){
    return (
        <div>
            {
                props.answeredCorrect
                ?
                <div className='answer correct' >
                    <h1 className='answer-indicator' >Correct</h1>
                    {/* <img src={check} alt='' className='answer-check-x'/> */}
                        <Check/>
                </div> 
                :
                <div className='answer incorrect' >
                    <h1 className='answer-indicator' >Incorrect</h1>
                    <img src={x} alt='' className='answer-check-x' />
                </div> 
            }           
        </div> 
    )
}