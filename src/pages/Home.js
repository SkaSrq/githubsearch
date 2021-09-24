import React,{useState, useContext} from "react";
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import {Redirect} from "react-router-dom";
import {
    Row,
    Col,
    Container,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import UserCard from '../components/UserCard';
import Repos from "../components/Repos";

const Home = () => {
    const context = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');

    const fetchDetails = async () =>{
        try{
            const {data} = await axios.get(`https://api.github.com/users/${query}`);
            setUser(data);
        }
        catch (error){
            toast('Not able to locate user', {type:"error"});
        }
    };

    if(!context.user?.uid){
        toast('Please Login First',{type:"error"});
        return(
            <Redirect to="/login"/>
        );
    }
    return (
        <Container>
            <Row className="mt-3">
                <Col md="5">
                    <InputGroup>
                        <Input
                        type="text"
                        value={query}
                        onChange={e=>setQuery(e.target.value)}
                        placeholder="Enter name to search"/>
                        <InputGroupAddon addonType="append">
                            <Button onClick={fetchDetails} color="primary">Fetch User</Button>
                        </InputGroupAddon>
                        {user? <UserCard user={user}/>:null}
                    </InputGroup>
                </Col>
                <Col md="7">{user ? <Repos repos_url={user.repos_url}/> :null}</Col>
            </Row>
        </Container>
    );
};
export default Home;