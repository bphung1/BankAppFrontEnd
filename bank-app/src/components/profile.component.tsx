import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import service from "../api/service";
import { User } from "../models/user";

interface RouterProps {
    history: string;
}
  
type Props = RouteComponentProps<RouterProps>;

export default class Profile extends Component<Props> {
    user: User = {
        userid: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: ""
    }

    constructor(props:Props){
        super(props);

        let user = service.getUserFromAPI();
        if (user) {
            this.user = user;
        } 
    }

    render(){
        return (
            <>
                <p>{this.user.firstName}</p>
            </>
        )
    }

}