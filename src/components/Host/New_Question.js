import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './Host-New-Question.css';
import './Host.css';

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
    addQuestion() {
        let { question, answer1, answer2, answer3, answer4, correctAnswer } = this.state;
        let { id } = this.props.match.params
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer) {
            axios.post('/api/newquestion', { question, answer1, answer2, answer3, answer4, correctAnswer, id }).then(res => {

                if (res.status === 200) {
                    this.setState({
                        redirect: true
                    })

                } else {
                    alert('Something went wrong :(')
                }

            })

        } else {
            alert('All fields must be completed')
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/host/questions' />;
        }
        return (
// I decided to just use arrow functions here instead of binding all of this at the top - Nate
  <div className='background'>
            <Link to='/host/questions' className='btn-go-back'>
                go back pls :)
            </Link>
            <br/>
    <div className='new-question-wrapper'>
                <div className='new-q'>
                    <label>Question</label>
                    <input onChange={(e) => this.setState({ question: e.target.value })} />
                </div>
            
                  <div className='new-q'> 
                    <label>Answer1</label>
                        <input onChange={(e) => this.setState({ answer1: e.target.value })} height='100'/>
                </div>
                <div className='new-q'>
                    <label>Answer2</label>
                        <input onChange={(e) => this.setState({ answer2: e.target.value })} />
                </div>
                <div className='new-q'>
                    <label>Answer3</label>
                        <input onChange={(e) => this.setState({ answer3: e.target.value })} />
               </div>
                <div className='new-q'>
                    <label>Answer4</label>
                        <input onChange={(e) => this.setState({ answer4: e.target.value })} />
                </div>
                <div className='new-q'>
                    <label>Correct answer</label>
                    <input type='number' min='1' max='4' onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                </div>
                    <div className='next'>
                        <button onClick={this.addQuestion}  className='btn-new'>Next</button>
                    </div>
        </div>
     </div>   
        )
    }
}
