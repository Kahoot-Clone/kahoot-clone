import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            pin: 0,
            players: []
        }
        this.generatePin = this.generatePin.bind(this)
    }
    componentDidMount(){
        this.socket = io('/');
        this.generatePin();
        this.socket.on('quiz-info', (quiz) => {
            console.log(quiz)
            this.setState({players: quiz.players})
        }  )
        this.socket.on('room-joined', (data)=>{ console.log(`joined on ${data}`) } )
    }
    generatePin(){
        let newPin = Math.floor(Math.random()*9000, 10000)
        this.setState({pin: newPin})
        this.socket.emit('host-join', {quiz:this.props.quiz, pin:newPin});
    }
    render() {
        // console.log(this.state)
        let {pin, players} = this.state;
        let mappedPlayers = players.map(player => {
            return(
                <p>{player.name}</p>
            )
        })
        return (
            <div>
                <h1>{pin}</h1>
                <div>

                </div> 
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