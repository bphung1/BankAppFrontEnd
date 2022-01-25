import { Component } from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import service from "../api/service";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { history } from "..";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  email: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { email: string; password: string }) {
    const { email, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });

    service.login(email, password).then(() => {
      service.getUser(email).then((res) => {
        if (res !== null) {
          history.push('/profile')
        }
      });
    });
  }

  handleLogout() {
    service.logout();
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      email: "",
      password: "",
    };

    return (
      <>
        <Header textAlign="center" style={{ marginTop: '50px'}} as='h2' icon>
            <Icon name='chess' />
            Welcome to Bank
        </Header>
        <Segment className="card card-container" style={{ marginLeft: '40.5%', marginTop: '50px'}}>

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <Form onSubmit={handleSubmit} >
                <Segment className="form-group" style={{ marginBottom: '-15px' }}>
                  <Field name="email" type="text" className="form-control" placeholder='email' />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </Segment>

                <Segment className="form-group" style={{ marginBottom: '-15px' }}>
                  <Field name="password" type="password" className="form-control" placeholder='Password' />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </Segment>

                <Segment className="form-group" style={{ marginBottom: '-15px' }}>
                  <Button animated type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <Button.Content visible>Login</Button.Content>
                    <Button.Content hidden>
                      <Icon name='thumbs down' />
                    </Button.Content>
                  </Button>
                </Segment>

                {message && (
                  <Segment className="form-group">
                    <Segment className="alert alert-danger" role="alert">
                      {message}
                    </Segment>
                  </Segment>
                )}
              </Form>
            )}
          </Formik>
          <Segment>
            <Button animated
              as={NavLink}
              to='/createuser'
            >
              <Button.Content visible>Create a new account</Button.Content>
                <Button.Content hidden>
                  <Icon name='eye' />
                </Button.Content>
            </Button>
          </Segment>
        </Segment>
      </>
    );
  }
}