import React, {useState, useContext} from "react";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import {Link} from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Header = ()=>{
    const context = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen);
    };
    return(
        <Navbar color="info" light expand="md">
            <Container>
                <NavbarBrand>
                    <Link to="/" className="text-white">
                        Sharique Github Repo
                    </Link>
                </NavbarBrand>
                <NavbarText className="text-black">
                    {context.user?.email ? context.user.email:""}
                </NavbarText>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {context.user?(
                            <NavItem>
                                <NavLink onClick={()=>{context.setUser(null)}} className="text-white">
                                Logout
                            </NavLink>
                            </NavItem>
                        ):(
                            <>
                            <NavItem>
                                <NavLink tag={Link} to="/login" className="text-white">
                                Login
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/signup" className="text-white">
                                Signup
                            </NavLink>
                            </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;