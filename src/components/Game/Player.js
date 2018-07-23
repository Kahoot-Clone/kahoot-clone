import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import PlayerQuestions from './Player_Questions';
import PlayerQuestionOver from './Player_Question_Over';
import './Game.css';

class Player extends Component {
    constructor() {
        super()
        this.state = {
            pinCorrect: false,
            gameStarted: false,
            questionOver: false,
            answerSubmitted: false
        }
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    componentDidMount() {
        this.socket = io('/');
        this.socket.emit('player-joined', this.props.selectedPin)
        this.socket.emit('player-add', this.props)
        this.socket.on('room-joined', (data) => { console.log('Quiz data: ' + data) })
        this.socket.on('game-started', data => {
            this.setState({
                gameStarted: true
            })
        })
        this.socket.on('question-over', () => {
            this.setState({
                questionOver: true
            })
        })
        this.socket.on('next-question', () => {
            console.log('hit')
            this.setState({
                questionOver: false,
                answerSubmitted: false
            })
        })
    }
    submitAnswer(num){ 
        // IDK where we want to grab the playerID from to pass here
        // Emit to trigger submitAnswer in the quiz constructor on Game.js
        this.setState({
            answerSubmitted: true
        })
    }
    render() {
        console.log(this.props)
        let { gameStarted, questionOver, answerSubmitted } = this.state;
        return (
            <div className='player-container' >
                <div className='status-bar'>
                    <p className='player-info' >PIN: {this.props.selectedPin}</p>
                </div> 
                {
                    !gameStarted && !questionOver
                    ?
                    <div>
                            <p>You're in!
                             <br />
                                Do you see your nickname on the screen?
                            </p>
                        </div>
                        :
                        gameStarted && !questionOver && !answerSubmitted
                        ?
                        <PlayerQuestions submitAnswer ={this.submitAnswer} />
                        :
                        gameStarted && !questionOver && answerSubmitted
                        ?
                        <div>
                            Did You answer too fast????
                        </div> 
                        :
                        <PlayerQuestionOver />
                    }
                    <div className='status-bar' >
                    <p className='player-info'>{this.props.nickname}</p>
                    <div className='status-bar-score' >0</div> 
                    </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedPin: state.selectedPin,
        nickname: state.nickname
    }
}

export default connect(mapStateToProps)(Player);