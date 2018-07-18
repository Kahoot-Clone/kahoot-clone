import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

export default class Landing extends Component {
    constructor(){
        super();
        this.state= {
            pin: ''
        }
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount(){
        this.socket = io('/');
        
    }

    handleInput(e){
        this.setState({
            pin: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                    <input placeholder='Game PIN' onChange={this.handleInput} />
                    <Link to={`/player/${this.state.pin}`}>
                    <button>ENTER</button>
                    </Link>
                </div>

                <div>
                    <a href='http://localhost:3030/auth'>HOST</a>
                </div> 
            </div>
        )
    }
}