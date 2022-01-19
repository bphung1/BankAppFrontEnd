import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../App.css';
import CreateUser from '../components/createuser.component';
import Login from '../components/login.component';

class App extends React.Component{

  render(){
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/createuser" component={CreateUser} />
          </Switch>
        </BrowserRouter>
      )
  }

}

export default App;

