import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import agent from "../api/agent";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State>  {

  handleLogin() {
    agent.login('sc@gmail.com', 'password1');
  }

  render() {
    return (
      <>
        <p>Hello World</p>
        <button onClick={() => this.handleLogin()}>Test</button>
      </>
    );
  }
}