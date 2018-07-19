import React, { Component } from 'react';
import axios from 'axios'
import {Link}from "react-router-dom"
import {connect} from 'react-redux'
import {editingQuiz} from '../../Ducks/Reducer'

class New_Quiz extends Component {
    constructor(){
        super();
        this.state= {
            quiz_name: '',
            info: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleTextarea = this.handleTextarea.bind(this);
        this.createQuiz = this.createQuiz.bind(this)
    }
    handleInput(e){
        this.setState({
            quiz_name: e.target.value
        })
    }
    handleTextarea(e){
        this.setState({
            info: e.target.value
        })
    }
    createQuiz(){
        axios.post('/api/newQuiz', {name: this.state.quiz_name, info: this.state.info}).then( res => {
            this.props.editingQuiz(res.data)
        })
    }
    render() {
        return (
            <div>
                <label>Title</label>
                <input onChange={this.handleInput} />
                <label>Description</label>
                <textarea onChange={this.handleTextarea}></textarea>
                <Link to='/host/questions' >
                <button onClick={this.createQuiz}>Ok, Go</button>
                </Link>

            </div> 
        )
    }
}


export default connect(null, {editingQuiz})(New_Quiz)