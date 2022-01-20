import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../App.css';
import CreateUser from '../components/createuser.component';
import Login from '../components/login.component';
import Profile from '../components/profile.component';
import Transfer from '../components/transfer.conponent';
import NavBar from './NavBar';

class App extends React.Component{

  render(){
      return (
        <>
          <Route exact path="/" component={Login} />
          <Route
            path={'/(.+)'}
            render={() => (
              <>
                <NavBar />
                <Container style={{ marginTop: '7em' }}>
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/transfer" component={Transfer} />
                  </Switch>
                </Container>
              </>
            )}
          />
          <Route exact path="/createuser" component={CreateUser} />

        </>
      )
  }

}

export default App;

