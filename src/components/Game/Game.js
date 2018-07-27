import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import GameQuestions from './Game_Questions';
import GameQuestionOver from './Game_Question_Over';
import GameOver from './Game_Over';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            pin: 0,
            timer: 20,
            isLive: false,
            questionOver: false,
            gameOver: false,
            currentQuestion: 0,
            questions: [],
            players: [],
            playerCounter: 0,
            leaderBoard: []
        }
        this.questionOver = this.questionOver.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
    }
    componentDidMount() {
        axios.get(`/api/getquestions/${this.props.quiz.id}`).then(res => {
            this.setState({ questions: res.data })
            console.log(this.questions)
        })
        this.socket = io('/');
        this.generatePin();
        this.socket.on('room-joined', data => {
            this.addPlayer(data.name, data.id)
        })
        this.socket.on('player-answer', data => {
            this.submitAnswer(data.name, data.answer)
        })

    }
    generatePin() {
        let newPin = Math.floor(Math.random() * 9000, 10000)
        this.setState({ pin: newPin })
        this.socket.emit('host-join', { pin: newPin });
    }
    startGame() {
        let { players } = this.state;
        if (players[0] //&& players[1] && players[2]
        ) {
            this.nextQuestion()
            this.setState({
                isLive: true
            })
        } else {
            alert('You need at least 3 players to start')
        }
    }
    hotTimer(){
        this.setState({timer:20});
        let countDown = ()=>{
            this.state.timer > 0
                ? this.setState({timer:this.state.timer-1})
                : clearInterval(downer)
        }
        let downer = setInterval(()=>{countDown()}, 1000);
        downer;
    }
    questionOver() {
        let { pin, players } = this.state
        this.socket.emit('question-over', { pin })
        let updatedPlayers = [...players];
        updatedPlayers.forEach((player)=>{
            player.qAnswered = false;
            player.answeredCorrect = false;
        })
        this.getLeaderBoard()
        this.setState({
            questionOver: true,
            currentQuestion: this.state.currentQuestion + 1,
            timer: 20,
            players: updatedPlayers
        })
    }
    timeKeeper() {
        let internalTimer = 20;
        let players = [...this.state.players]

        this.setState({ questionOver: false })

        timeCheck = timeCheck.bind(this)

        function timeCheck(){
            let checkAnswers = ()=>{
                let pAnswered = 0;
                players.forEach((player)=>{
                    player.qAnswered ? ++pAnswered :null
                })
                players.forEach(player => {
                    if(player.answeredCorrect){
                        player.score += (internalTimer*10 +1000)
                        this.socket.emit('sent-info', { id: player.id, score: player.score, answeredCorrect: player.answeredCorrect })
                    }
                    
                });
                pAnswered === players.length ? internalTimer=0 : null
                internalTimer-=1;
            }
            let endQuestion = ()=>{
                clearInterval(timeKept);
                this.questionOver();
            }
            return internalTimer > 0 
            ? checkAnswers()
            : endQuestion()
        }
        let timeKept = setInterval(()=>{timeCheck()}, 1000);
        return timeKept
    }

    nextQuestion() {
        let { pin, questions, currentQuestion } = this.state;
        this.timeKeeper();
        // this.hotTimer();

        currentQuestion === questions.length 
            ? this.setState({ gameOver: true })
            : 
            this.socket.emit('next-question', { pin })
            this.setState({questionOver:false})      
    }

    addPlayer(name, id) {
        let player = {
            id: id, // this is now their socket id so they can pull their score to the player component using this
            name: name,
            score: 0,
            qAnswered: false,
            answeredCorrect: false
        }
        let newPlayers = [...this.state.players]
        newPlayers.push(player)
        // console.log(newPlayers)
        this.setState({
            players: newPlayers,
            playerCounter: this.state.playerCounter + 1
        })
    }

    submitAnswer(name, answer) {
        let player = this.state.players.filter(player => player.name === name);
        let updatedPlayers = this.state.players.filter(player => player.name !== name);
        
        player[0].qAnswered = true;
        answer === this.state.questions[this.state.currentQuestion].correctanswer
            ?player[0].answeredCorrect = true
            :player[0].answeredCorrect = false

        updatedPlayers.push(player[0])
        this.setState({
            players: updatedPlayers
        })
        
    }

    getLeaderBoard() {
        let unsorted = [...this.state.players];
        let leaderboard = unsorted.sort((a, b) => b.score - a.score)
        console.log(leaderboard)
        this.setState({
            leaderBoard: leaderboard
        })
    }

    render() {
        console.log(this.state)
        let { pin, questions, currentQuestion, isLive, questionOver, gameOver, timer } = this.state;
        let mappedPlayers = this.state.players.map(player => {
            return (
                <p key={player.id}>{player.name}</p>
            )
        })
        return (
            <div>
                <h1>{pin}</h1>
                {
                    !isLive && !questionOver && !gameOver ?
                        <div>
                            <button onClick={() => this.startGame()}>Play</button>
                            {mappedPlayers}
                        </div>
                        :
                        isLive && !questionOver && !gameOver ?
                            <GameQuestions
                                question={questions[currentQuestion].question}
                                answer1={questions[currentQuestion].answer1}
                                answer2={questions[currentQuestion].answer2}
                                answer3={questions[currentQuestion].answer3}
                                answer4={questions[currentQuestion].answer4}
                                questionOver={this.questionOver} />
                            :
                            isLive && questionOver && !gameOver ?
                                <GameQuestionOver nextQuestion={this.nextQuestion} />
                                :
                                <GameOver leaderboard={this.state.leaderBoard} />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(Game)