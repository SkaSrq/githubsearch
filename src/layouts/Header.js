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

    let getUser = ()=>{
        if(context.user && context.user?.email){
            const emailAdd = context.user.email;
            const myArr = emailAdd.split("@");
            return myArr[0];
        }
        else{
            return null;
        }
    };
    return(
        <Navbar color="info" light expand="md">
            <Container>
                <NavbarBrand className="text-white" tag={Link} to="/">
                Sharique Github Repo
                    {/* <Link to="/" className="text-white">
                        Sharique Github Repo
                    </Link> */}
                </NavbarBrand>
                <NavbarText className="text-white font-weight-bold firstContainer">
                    {/* {context.user?.email ? context.user.email:""} */}
                    {getUser()}
                </NavbarText>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="secondContainer" navbar>
                        {context.user?(
                            <NavItem>
                                <NavLink onClick={()=>{context.setUser(null)}} tag={Link} to="/" className="text-white">
                                Logout
                            </NavLink>
                            </NavItem>
                        ):(
                            <>
                            <NavItem>
                                <NavLink onClick={()=>(setIsOpen(!isOpen))} tag={Link} to="/login" className="text-white">
                                Login
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={()=>(setIsOpen(!isOpen))} tag={Link} to="/signup" className="text-white">
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