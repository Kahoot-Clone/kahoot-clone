import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            pin: 0,
            quiz:{
                players:[]
            }
        }
        this.generatePin = this.generatePin.bind(this);
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
  
    render() {
        console.log(this.state.quiz)
        let {pin} = this.state;
        let mappedPlayers = this.state.quiz.players.map(player => {
            return(
                <p key={player.id}>{player.name}</p>
            )
        })
        return (
            <div>
                <h1>{pin}</h1>
                <div>
                    {mappedPlayers}
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