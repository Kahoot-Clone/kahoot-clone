import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectedQuiz} from '../../Ducks/Reducer';
 
class Main extends Component {
    constructor(){
        super();
        this.state= {
            quizzes: [],
            redirect: false
        }
        this.setRedirect = this.setRedirect.bind(this);
    }
    componentDidMount(){
        axios.get(`/api/getQuizzes`).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
        // this.socket = io('/');
        // this.socket.on('quiz-created', this.setRedirect)
    }
    setRedirect(e){
        this.props.selectedQuiz(e);

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
                    <button onClick={() => {this.setRedirect(quiz)}}>Play</button>
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

export default connect(null, {selectedQuiz})(Main);