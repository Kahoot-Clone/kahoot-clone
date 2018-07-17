import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            quiz:{}
        }
    }
    componentDidMount(){
        //db call, get the quiz object, with thtis.props.id
        //this.setState({quiz and questions})
    }

    render() {
        let { questions } = this.state;
        let mappedQuestions = questions.map((question, i) => {
            return (
                <div key={i} >
                    <h1>{question.name}</h1>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })
        return (
            <div>
                <Link to='/host'>
                <button >Done</button>
                </Link>
                <div>
                    <h1>{this.state.quiz.quiz_name}</h1>
                    <p>{this.state.quiz.info}</p>
                    <hr/>
                </div> 
                {mappedQuestions}
                <div>
                    <button  >Add Question</button>
                </div> 
            </div>
        )
    }
}