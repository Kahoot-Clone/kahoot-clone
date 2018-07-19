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
        this.socket.emit('player-joined', this.props.selectedPin)
        this.socket.emit('player-add', this.props)
        this.socket.on('room-joined', (data)=>{console.log(data)})
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <p>{this.props.selectedPin}</p>
                <p>{this.props.nickname}</p>
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        selectedPin: state.selectedPin,
        nickname: state.nickname
    }
}

export default connect(mapStateToProps)(Player);