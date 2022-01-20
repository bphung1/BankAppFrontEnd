import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { User } from "../models/user";



interface RouterProps {
    history: string;
}
  
type Props = RouteComponentProps<RouterProps>;

export default class profile extends Component<Props> {

    constructor(props:Props){
        super(props);
    }

    render(){
        return (
            <>
                <p>hello world</p>
            </>
        )
    }

}