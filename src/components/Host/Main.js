import React, { Component } from 'react';

export default class  extends Component {
    constructor(){
        super();
        this.state= {
            quizzes: []
        }
    }
    render() {
        let {quizzes} = this.state;
        let mappedQuizzes = quizzes.map(quiz => {
            return(
                <div key={quiz.id}>
                    <h1>{quiz.quiz_name}</h1>
                    <p>{quiz.info}</p>
                </div> 
            )
        })
        return (
            <div>

            </div> 
        )
    }
}