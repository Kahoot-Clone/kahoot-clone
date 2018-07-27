import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Host-New-Question.css';
import './Host-Question.css'
import './Host.css';

export default class Edit_Question extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
            correctAnswer: ''
        }
    }
    componentDidMount() {
        this.getQuestion()
    }
    getQuestion() {
        axios.get(`/api/getquestion/${this.props.match.params.id}`).then(res => {
            let question = res.data[0]
            this.setState({
                id: question.id,
                question: question.question,
                answer1: question.answer1,
                answer2: question.answer2,
                answer3: question.answer3,
                answer4: question.answer4,
                correctAnswer: question.correctanswer,
                redirect: false
            })
        })
    }
    updateQuestion() {
        let { question, answer1, answer2, answer3, answer4, correctAnswer, id } = this.state;
        if (question && answer1 && answer2 && answer3 && answer4 && correctAnswer && id) {
            axios.put('/api/updatequestion', { question, answer1, answer2, answer3, answer4, correctAnswer, id }).then(res => {
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
            return <Redirect to='/host/questions' />
        }
        return (                                        
// Used a bunch of arrow functions here instead of binding at top - Nate
        <div className='mapped-container'>
        <Link to='/host/questions' className='btn-link'>
        go back
        </Link>
            <div className='new-q'>
                <label>Question</label>
                <input value={this.state.question} onChange={(e) => this.setState({ question: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Answer1</label>
                <input value={this.state.answer1} onChange={(e) => this.setState({ answer1: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Answer2</label>
                <input value={this.state.answer2} onChange={(e) => this.setState({ answer2: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Answer3</label>
                <input value={this.state.answer3} onChange={(e) => this.setState({ answer3: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Answer4</label>
                <input value={this.state.answer4} onChange={(e) => this.setState({ answer4: e.target.value })} />
            </div>
                <br />
            <div className='new-q'>
                <label>Correct Answer</label>
                <input type='number' value={this.state.correctAnswer} onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                <button onClick={() => this.updateQuestion()}>Update</button>
            </div>

            </div>
        )
    }
}