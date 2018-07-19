import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            quiz:{}
        }
    }
    componentDidMount(){
        axios.get(`/api/getQuizAndQs/${this.props.quizToEdit.id}`).then( res => {
            this.setState({
                questions: res.data.questions,
                quiz: res.data.quiz
            })
        })
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
                    <Link to={`/host/newquestion/${this.props.quizToEdit.id}`} >
                    <button >Add Question</button>
                    </Link>
                </div> 
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        quizToEdit: this.state
    }
}

export default connect(mapStateToProps)(Questions)