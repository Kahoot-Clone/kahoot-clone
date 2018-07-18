import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './Store'

ReactDOM.render(
    <Provider store={Store}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>
    ,
    document.getElementById('root')
);
unregister();
