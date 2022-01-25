import React from "react";
import { Button, Container, Header, Icon, Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import service from "../api/service";
import CreateUser from "../components/createuser.component";

export default function NavBar() {
    function hangleLogout() {
        service.logout();
    }

    const user = service.getUserFromAPI();

    return (
        <>
            {(user && 
                <Menu inverted fixed="top">
                    <Container>
                        <Menu.Item as={NavLink} to='/profile' name="Profile">
                            {/* <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="logo"
                                style={{ marginRight: '10px' }}
                            /> */}
                            <Icon name="chess king" />
                            Profile
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/checkingAccount' name="CheckingAccount">
                            <Icon name="chess bishop" />
                            Checking Account
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/savingAccount' name="SavingAccount">
                            <Icon name="chess queen" />
                            Savings Account
                        </Menu.Item>
                        <Menu.Item as={NavLink} to='/transfer' name="Transfer">
                            <Icon name="chess knight" />
                            Transfer
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={hangleLogout} as={NavLink} to='/' content='Log out' />
                        </Menu.Item>
                    </Container>
                </Menu>
            )
                || 
                (
                    <Header textAlign="center" style={{ marginTop: '50px'}} as='h2' icon>
                        <Icon name='chess pawn' />
                        Create Account
                    </Header>
                )
            } 
        </>
    );
}