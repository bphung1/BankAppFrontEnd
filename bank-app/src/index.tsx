import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import '../src/layout/style.css';
import Login from './components/login.component';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route exact path="/home" component={App} />
       <Route exact path="/login" component={Login} />
      </Switch>
      </BrowserRouter>
      ,
  document.getElementById('root')
);

reportWebVitals();
