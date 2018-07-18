import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Game extends Component {
    constructor(){
        super();
        this.state = {
            pin: '',
            players: []
        }
    }
    componentDidMount(){
        this.socket = io('/');
        this.socket.emit('host-routed');
        this.socket.on('quiz-info', (currentQuiz) => {
            console.log(currentQuiz)
        })
    }
    render() {
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