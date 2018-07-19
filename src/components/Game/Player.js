import React, { Component } from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

class Player extends Component {
    constructor(){
        super()
        this.state={
            pinCorrect: false
        }
    }
    componentDidMount(){
        this.socket= io('/');
        this.socket.emit('player-joined', this.props.pin)
    }
    render() {
        return (
            <div>

            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        pin: state.pin,
        nickname: state.nickname
    }
}

export default connect(mapStateToProps)(Player);