import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
 
export default class Main extends Component {
    constructor(){
        super();
        this.state= {
            quizzes: [],
            redirect: false
        }
        this.setRedirect = this.setRedirect.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/getQuizzes/${1}`).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
        this.socket = io('/');
        this.socket.on('quiz-created', this.setRedirect)
    }
    setRedirect(){
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect){
           return <Redirect to='/game'/>
        }
        let {quizzes} = this.state;
        let mappedQuizzes = quizzes.map(quiz => {
            return(
                <div key={quiz.id}>
                    <h1>{quiz.quiz_name}</h1>
                    <p>{quiz.info}</p>
                    <button onClick={() => this.socket.emit('host-join', {quiz})}>Play</button>
                </div> 
            )
        })
        return (
            <div>
                {mappedQuizzes}

                <Link to='/host/newquiz'>
                <button>New Kahoot</button>
                </Link>

            </div> 
        )
    }
}