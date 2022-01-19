import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import service from "../api/service";
import { Button, Segment } from "semantic-ui-react";


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

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });

    service.login(username, password).then(() => {
      service.getUser(username);
    });
  }

  handleLogout() {
    service.logout();
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <Segment className="col-md-12">
        <Segment className="card card-container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <Segment className="form-group">
                <Field name="username" type="text" className="form-control" placeholder='Username' />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </Segment>

              <Segment className="form-group">
                <Field name="password" type="password" className="form-control" placeholder='Password' />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </Segment>

              <Segment className="form-group">
                <Button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </Button>
                <Button onClick={() => this.handleLogout()}>Logout</Button>
              </Segment>

              {message && (
                <Segment className="form-group">
                  <Segment className="alert alert-danger" role="alert">
                    {message}
                  </Segment>
                </Segment>
              )}
            </Form>
          </Formik>
          <Segment>
            <Button>Create new account</Button>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}