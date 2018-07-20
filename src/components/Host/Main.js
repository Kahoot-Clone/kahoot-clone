import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectedQuiz, editingQuiz} from '../../Ducks/Reducer';
 
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
        this.getQuizzes()
        
    }
    getQuizzes(){
        axios.get(`/api/getQuizzes`).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }
    setRedirect(e){
        this.props.selectedQuiz(e);

        this.setState({
            redirect: true
        })
    }
    deleteQuiz(id){
        axios.delete(`/api/deletequiz/${id}`).then(res => {
            if (res.status === 200){
                this.getQuizzes();
            } else{
                alert('Something went wrong :(')
            }
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
                    <button onClick={() => this.setRedirect(quiz)}>Play</button>
                    <button onClick={() =>  this.deleteQuiz(quiz.id)}>Delete</button>
                    <Link to='/host/questions'>
                    <button onClick={()=> this.props.editingQuiz(quiz)}>Edit</button>
                    </Link>
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

export default connect(null, {selectedQuiz, editingQuiz})(Main);