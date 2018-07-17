import React, { Component } from 'react';

export default class New_Quiz extends Component {
    constructor(){
        super();
        this.state= {
            quiz_name: '',
            info: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleTextarea = this.handleTextarea.bind(this);
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
        
    }
    render() {
        return (
            <div>
                <label>Title</label>
                <input onChange={this.handleInput} />
                <label>Description</label>
                <textarea onChange={this.handleTextarea}></textarea>

                <button onClick={this.createQuiz}>Ok, Go</button>

            </div> 
        )
    }
}