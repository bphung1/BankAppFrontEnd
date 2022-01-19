import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../App.css';
import Login from '../components/login.component';

class App extends React.Component{

  render(){
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      )
  }

}

export default App;

