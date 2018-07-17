import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/game/:id' component={} />
        </Switch>
      </div>
    );
  }
}

export default App;