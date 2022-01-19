import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import service from "../api/service";
import { Button, Segment } from "semantic-ui-react";
import { User } from "../models/user";


interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    password: string,
    loading: boolean,
    message: string
};

export default class CreateUser extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.createUser = this.createUser.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    validationSchema() {
        return Yup.object().shape({
            firstName: Yup.string().required("This field is required!"),
            lastName: Yup.string().required("This field is required!"),
            email: Yup.string().required("This field is required!"),
            phoneNumber: Yup.string().required("This field is required!"),
            address: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });
    }

    createUser(formValue: { firstName: string; lastName: string; email: string; phoneNumber: string; address: string; password: string }) {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            password
        } = formValue;

        let newUser: User = {
            userid: 0,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            password: password
        }

        this.setState({
            message: "",
            loading: true
        })

        service.register(newUser);
    }

    render() {

        const { loading, message } = this.state;

        const initialValues = {
                
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                address: "",
                password: ""
            };

        return (
            <Segment className="col-md-12">
                <Segment className="card card-container">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.createUser}
                    >
                        <Form>

                            <Segment className="form-group">
                                <Field name="firstName" type="text" className="form-control" placeholder='First Name' />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </Segment>

                            <Segment className="form-group">
                                <Field name="lastName" type="text" className="form-control" placeholder='Last Name' />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </Segment>

                            <Segment className="form-group">
                                <Field name="email" type="text" className="form-control" placeholder='email' />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </Segment>

                            <Segment className="form-group">
                                <Field name="phoneNumber" type="text" className="form-control" placeholder='Phone Number' />
                                <ErrorMessage
                                    name="phoneNumber"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </Segment>

                            <Segment className="form-group">
                                <Field name="address" type="text" className="form-control" placeholder='Address' />
                                <ErrorMessage
                                    name="address"
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
                                <span>Submit</span>
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
                    </Formik>
                </Segment>
            </Segment>
        )
    }
}