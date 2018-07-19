import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import io from 'socket.io-client';
import {connect} from 'react-redux';
import {handleNickname, selectedPin} from '../../Ducks/Reducer';

class Landing extends Component {
    constructor(){
        super();
        this.state= {
            pin: '',
            nickname: '',
            toggle: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleNicknameInput = this.handleNicknameInput.bind(this);
        this.handleGo = this.handleGo.bind(this)
    }
    handleInput(e){
        this.setState({
            pin: e.target.value
        })

    }
    handleToggle(){
        this.props.selectedPin(this.state.pin)
        this.setState({
            toggle: true
        })
    }
    handleNicknameInput(e){
        this.setState({
            nickname: e.target.value
        })
    }
    handleGo(){
        this.props.handleNickname(this.state.nickname)
    }
    render() {
        console.log(this.state)
        return (
            <div>
                {
                    !this.state.toggle
                        ?
                        <div>
                            <input type='number' value={this.state.pin} placeholder='Game PIN' onChange={this.handleInput} />
                            <button onClick={this.handleToggle} >next</button>
                        </div>
                        :
                        <div>
                            <input type='text' value={this.state.nickname} placeholder='Nickname' onChange={this.handleNicknameInput} />
                        <Link to='/player'>    
                            <button onClick={this.handleGo}>OK,go!</button>
                        </Link>    
                        
                        </div> 
                }
                <div>
                    <a href='http://localhost:3030/auth'>HOST</a>
                </div> 
            </div>
        )
    }
}

export default connect(null, {handleNickname, selectedPin})(Landing)