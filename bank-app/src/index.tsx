import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import '../src/layout/style.css';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
