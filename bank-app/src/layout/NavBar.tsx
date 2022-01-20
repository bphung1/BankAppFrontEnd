import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/profile' name="Profile">
                    Profile
                </Menu.Item>
            </Container>
        </Menu>
    );
}