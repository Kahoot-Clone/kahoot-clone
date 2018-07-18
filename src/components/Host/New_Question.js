import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class New_Question extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: 0,
            redirect: false
        }
        this.addQuestion = this.addQuestion.bind(this)
    }
    addQuestion(){
        let {question, answer1, answer2, answer3, answer4, correctAnswer} = this.state;
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer){
            // axios.post('/api/add_question', {question, answer1, answer2, answer3, answer4, correctAnswer}).then(res => {
            //     this.setState({redirect: true})
            // })

        } else {
            alert('All fields must be completed')
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/host/questions'/>;
          }
        return (
            <div>
                <label>Question</label>
                <input onChange={(e)=> this.setState({question: e.target.value}) }/>
                <label>Answer1</label>
                <input onChange={(e)=> this.setState({answer1: e.target.value}) }/>
                <label>Answer2</label>
                <input onChange={(e)=> this.setState({answer2: e.target.value}) }/>
                <label>Answer3</label>
                <input onChange={(e)=> this.setState({answer3: e.target.value}) }/>
                <label>Answer4</label>
                <input onChange={(e)=> this.setState({answer4: e.target.value}) }/>
                <label>Correct answer</label>
                <input type='number' min='1' max='4' onChange={(e) => this.setState({correctAnswer: e.target.value})} />

                <button onClick={this.addQuestion}>Next</button>
            </div>
        )
    }
}