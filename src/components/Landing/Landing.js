import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNickname, selectedPin } from '../../Ducks/Reducer';
import '../../App.css';
import kwizz from '../../Assests/Kwizz.svg'

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            pin: '',
            nickname: '',
            toggle: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleNicknameInput = this.handleNicknameInput.bind(this);
        this.handleGo = this.handleGo.bind(this)
    }
    handleInput(e) {
        this.setState({
            pin: e.target.value
        })

    }
    handleToggle() {
        this.props.selectedPin(this.state.pin)
        this.setState({
            toggle: true
        })
    }
    handleNicknameInput(e) {
        this.setState({
            nickname: e.target.value
        })
    }
    handleGo() {
        this.props.handleNickname(this.state.nickname)
    }
    render() {
        return (
            
            <div className='background' >
                <div className='container' >
                    <div></div> 
                    {
                        !this.state.toggle
                        ?
                        <div className='container' >
                                <div></div> 
                                <img src={kwizz} className=''/>
                                <div></div> 
                                <div></div> 
                                <input type='number' value={this.state.pin} placeholder='Game PIN' onChange={this.handleInput} className='input-username ' />
                                <div></div> 
                                <div></div> 
                                <button onClick={this.handleToggle} className='btn-enter ' >Enter</button>
                                <div></div> 
                            </div>
                            :
                            <div className='container' >
                                <div></div> 
                               <img src={kwizz} className=''/>
                                <div></div> 
                                <div></div> 
                                <input type='text' value={this.state.nickname} placeholder='Nickname' onChange={this.handleNicknameInput} className='input-username  '/>
                                <div></div> 
                                <div></div> 
                                <Link to='/player'>
                                    <button onClick={this.handleGo} className='btn-enter '>OK,go!</button>
                                </Link>
                                <div></div> 
                            </div>
                    }
                    <div></div> 
                    <div></div>
                        <a href='http://localhost:3030/auth' className='btn-enter' >HOST</a>
                    <div></div> 
                   
                </div>
             </div> 
        )
    }
}

export default connect(null, { handleNickname, selectedPin })(Landing)