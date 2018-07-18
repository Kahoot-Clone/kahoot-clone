import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';

class Game extends Component {
    constructor(){
        super();
        this.state = {
            pin: '',
            players: []
        }
    }
    componentDidMount(){
        this.socket = io('/');
        console.log(this.props.quiz);
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

function mapStateToProps(state){
    return{
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(Game)