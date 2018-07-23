import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import GameQuestions from './Game_Questions';
import GameQuestionOver from './Game_Question_Over';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            pin: 0,
            quiz:{
                players:[]
            },
            gameStarted: false,
            questionOver: false
        }
        this.generatePin = this.generatePin.bind(this);
        this.questionOver = this.questionOver.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    componentDidMount(){
        this.socket = io('/');
        this.generatePin();
        this.socket.on('room-joined', (quiz) => {
            this.setState({quiz: quiz})
        }  )
    }
    generatePin(){
        let newPin = Math.floor(Math.random()*9000, 10000)
        this.setState({pin: newPin})
        this.socket.emit('host-join', {quiz:this.props.quiz, pin:newPin});
    }
    startGame(){
        let {pin} = this.state
        this.socket.emit('game-started', {
            pin
        })
        this.setState({
            gameStarted: true
        })
    }
    questionOver(){
        let {pin} = this.state
        this.socket.emit('question-over', {pin} )
        this.setState({
            questionOver:true
        })
    }
    nextQuestion(){
        let {pin, quiz} = this.state
        quiz.nextQuestion()                    // Getting error that says quiz.nextQuestion is not a function. we may need to call it on the back end or it could be an issue with binding.
        this.socket.emit('next-question', {pin})
        this.setState({
            questionOver: false
        })
    }
  
    render() {
        console.log(this.state.quiz)
        let {pin, quiz, gameStarted, questionOver} = this.state;
        let mappedPlayers = this.state.quiz.players.map(player => {
            return(
                <p key={player.id}>{player.name}</p>
            )
        })
        return (
            <div>
                <h1>{pin}</h1>
                {
                   !gameStarted && !questionOver ?
                <div>
                    <button onClick={()=> this.startGame()}>Play</button>
                    {mappedPlayers}
                </div> 
                   :
                   gameStarted && !questionOver ?
                   <GameQuestions
                    question={quiz.questions[quiz.currentQuestion].question}
                    answer1={quiz.questions[quiz.currentQuestion].answer1}
                    answer2={quiz.questions[quiz.currentQuestion].answer2} 
                    answer3={quiz.questions[quiz.currentQuestion].answer3} 
                    answer4={quiz.questions[quiz.currentQuestion].answer4} 
                    questionOver={this.questionOver}/>
                   :
                   <GameQuestionOver nextQuestion={this.nextQuestion}/>
                }
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(Game)