import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
 
export default class  extends Component {
    constructor(){
        super();
        this.state= {
            quizzes: []
        }
    }
    componentDidMount(){
        axios.get(`/api/getQuizzes/${1}`).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
        this.socket = io('/');
    }
    render() {
        let {quizzes} = this.state;
        let mappedQuizzes = quizzes.map(quiz => {
            return(
                <div key={quiz.id}>
                    <h1>{quiz.quiz_name}</h1>
                    <p>{quiz.info}</p>
                    <button onClick={() => this.socket.emit('host-join', {id: quiz.id})}>Play</button>
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