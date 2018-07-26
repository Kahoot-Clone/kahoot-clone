import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectedQuiz, editingQuiz} from '../../Ducks/Reducer';
import './Host.css';
import Kwizz from '../../Assests/Kwizz.svg';
 
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
                <div key={quiz.id} className='kwizz-container' >
                        <h1 className='kwizz-info kwizz-title' >{quiz.quiz_name}</h1>
                        <p className='kwizz-info kwizz-desc'>{quiz.info}</p>
                    <div className='btn-container' >
                        <button onClick={() => this.setRedirect(quiz)} className='btn-play' >Play</button>
                        <button onClick={() =>  this.deleteQuiz(quiz.id)} className='btn-play' >Delete</button>
                    <Link to='/host/questions'>
                        <button onClick={()=> this.props.editingQuiz(quiz)} className='btn-play' >Edit</button>
                    </Link>
                    </div> 
                </div> 
            )
        })
        return (
            <div className='mapped-container' >
                <div className='host-logo-container'>
                    <img src={Kwizz} alt='kwizz logo' className='logo'/>
                </div> 
                <div className='newKwizz' >
                    <Link to='/host/newquiz' className='btn-link'>
                    <button className='btn-new'>New Kwizz!</button>
                    </Link>
                </div> 
                <div className='mapped-Kwizzes-container' >
                {mappedQuizzes}
                </div> 
            </div> 
        )
    }
}

export default connect(null, {selectedQuiz, editingQuiz})(Main);