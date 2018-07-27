import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleNickname, selectedPin } from '../../Ducks/Reducer';
import './Landing.css';
import Kwizz from '../../Assests/Kwizz.svg'
import Kwizzard from '../../Assests/Kwizzard--test-pixel.svg'
import Stars from '../animations/Stars.js';


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
            <div className='component-container' >
            <div>
                <Stars/>
                </div> 
                {
                    !this.state.toggle
                        ?
                        <div className='landing-wrapper' >
                            <div className='logo-container' >
                            <img src={Kwizz} alt='Kwizz logo' className='logo'/>
                            </div> 
                            <div className='player-input-wrapper' >
                                <input type='number' value={this.state.pin} placeholder='Kwizz! PIN' onChange={this.handleInput} className='input-user'/>
                                <button onClick={this.handleToggle} className='btn-enter' >Enter</button>
                            </div> 
                        </div>
                        :
                        <div className='landing-wrapper' >
                          <div className='logo-container' >
                            <img src={Kwizz} alt='Kwizz logo' className='logo'/>
                          </div> 
                            <div>
                                <input type='text' value={this.state.nickname} placeholder='Nickname' onChange={this.handleNicknameInput} className='input-user' />
                                <Link to='/player'>
                                    <button onClick={this.handleGo} className='btn-enter' >OK, go!</button>
                                </Link>
                            </div> 
                        </div>
                }
                <div className='logo-host' >
                    <img src={Kwizzard} alt='' className='kwizzard'/>
                    <div className='btn-host' >
                        <a id='atag' href='http://localhost:3030/auth'>HOST</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, { handleNickname, selectedPin })(Landing)