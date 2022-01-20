import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import CreateUser from '../components/createuser.component';
import Login from '../components/login.component';
import Profile from '../components/profile.component';

class App extends React.Component{

  render(){
      return (
        <>
          <Route exact path="/" component={Login} />
          <Route
            path={'/(.+)'}
            render={() => (
              <>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/createuser" component={CreateUser} />
                  <Route path="/profile" component={Profile} />
                </Switch>
              </>
            )}
          />
        </>
      )
  }

}

export default App;

