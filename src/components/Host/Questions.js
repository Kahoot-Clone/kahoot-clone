import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editingQuiz } from '../../Ducks/Reducer';
import './Host-Question.css';
import './Host.css';

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            quiz: {},
            newName: '',
            newInfo: '',
            toggle: false
        }
    }
    componentDidMount() {
        this.setState({
            quiz: this.props.quizToEdit
        })
        this.getQuestions();
    }

    getQuestions() {
        axios.get(`/api/getquestions/${this.props.quizToEdit.id}`).then(res => {
            this.setState({
                questions: res.data,
            })
        })
    }

    deleteQuestion(id) {
        axios.delete(`/api/deletequestion/${id}`).then(res => {
            this.getQuestions()
        })
    }

    displayEdit(){
        this.setState({
            toggle: !this.state.toggle
        })
    }

    updateQuiz() {
        let { newName, newInfo, quiz } = this.state;
        this.setState({
            toggle: !this.state.toggle
        })
        if (newName && newInfo) {
            axios.put('/api/updatequiz', { newName, newInfo, id: quiz.id }).then(res => {
                this.handleUpdatedQuiz(quiz.id)
            })
        } else {
            alert('All fields must be completed')
        }
    }
    handleUpdatedQuiz(id) {
        axios.get(`/api/getquiz/${id}`).then(res => {
            this.props.editingQuiz(res.data[0])
            this.setState({
                quiz: this.props.quizToEdit
            })
        })
    }

    render() {
        let { questions } = this.state;
        if (questions) {
            var mappedQuestions = questions.map((question) => {
                return (
                    <div key={question.id} className='question-container'>
                        <h1>{question.question}</h1>
                        <ul>
                            <li>1: {question.answer1}</li>
                            <li>2: {question.answer2}</li>
                            <li>3: {question.answer3}</li>
                            <li>4: {question.answer4}</li>
                            <li>Correct: {question.correctanswer}</li>

                        </ul>
                        <div className='btn-container-edit' >
                            <Link to={`/host/editquestion/${question.id}`}>
                                <button className='btn-play' >Edit</button>
                            </Link>
                            <button onClick={() => this.deleteQuestion(question.id)} className='btn-play'>Delete</button>
                        </div> 
                    </div>
                )
            })

        }

        return (
            <div className= 'mapped-container' >
                { 
                    !this.state.toggle 
                        ?
                    <div className='toggle-container'>
                        <div className='btn-done-div'>
                            <Link to='/host'>
                                <button className='btn-play btn-done' >Done</button>
                            </Link>
                        </div>
                    <div className='kwizz-container-edit'>
                        <h1 className='kwizz-title'>{this.state.quiz.quiz_name}</h1>
                        <br />
                        <p className='kwizz-info kwizz-desc'>{this.state.quiz.info}</p>
                        <div className='btn-update'>
                        <button onClick={() => this.displayEdit()} className='btn-play' >Update</button>
                        </div>
                    </div>
                    </div>
                        :
                        <div className='toggle-container'>
                            <div className='btn-done-div'>
                                <Link to='/host'>
                                    <button className='btn-play btn-done' >Done</button>
                                </Link>
                            </div>
                    <div className='kwizz-container-edit'>
                        {/* <h1 className='kwizz-title'>{this.state.quiz.quiz_name}</h1>
                        <p className='kwizz-info kwizz-desc'>{this.state.quiz.info}</p> */}
                        <input placeholder={this.state.quiz.quiz_name} onChange={(e) => this.setState({ newName: e.target.value })} className='title-input input-edit ' />
                        <br/>
                        <textarea placeholder={this.state.quiz.info} onChange={(e) => this.setState({ newInfo: e.target.value })} className='desc-input input-edit'></textarea>
                    <div className='btn-container-edit'>
                        <button onClick={() => this.updateQuiz()} className='btn-play'>Save</button>
                        <button onClick={() => this.displayEdit()} className='btn-play' >Cancel</button>
                    </div>
                    </div>
                    </div>
                }
                <div className='question-edit-wrapper' >
                    <div className='add-quesiton-div' >
                        <Link to={`/host/newquestion/${this.props.quizToEdit.id}`} className='btn-link'>
                            <button className='btn-new' id='add-question-btn'>Add Question</button>
                        </Link>
                    </div> 
                    <br /><br />
                    <div  className='mapped-questions' >
                        {mappedQuestions}
                    </div>
                    </div>
                </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        quizToEdit: state.quizToEdit
    }
}

export default connect(mapStateToProps, { editingQuiz })(Questions)