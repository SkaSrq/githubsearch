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
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UserCard from '../components/UserCard';
import Repos from "../components/Repos";

const Home = () => {
    const context = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [query, setQuery] = useState('');
    const [loaded, setLoaded] = useState(true);

    const fetchDetails = async () =>{
        try{
            setLoaded(false);
            const {data} = await axios.get(`https://api.github.com/users/${query}`);
            setUser(data);
            setLoaded(true);
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
                        lassName="mr-3"
                        type="text"
                        value={query}
                        onChange={e=>setQuery(e.target.value)}
                        placeholder="Enter name to search"/>
                        {/* <TextField value={query}
                        onChange={e=>setQuery(e.target.value)} onClick={fetchDetails} id="outlined-basic" variant="outlined" label="Enter name to"  /> */}
                        <InputGroupAddon c  addonType="append">
                            {/* <Button onClick={fetchDetails} color="primary">Fetch User</Button> */}
                            <Button onClick={fetchDetails} type="submit" className=" btn-outline-light" variant="outlined">Fetch User</Button>
                        </InputGroupAddon>
                        {user? <UserCard user={user}/>:null}
                    </InputGroup>
                </Col>
                {loaded ? (
                    <Col md="7">{user ? <Repos repos_url={user.repos_url}/> :null}</Col>
                ):("")}
            </Row>
        </Container>
    );
};
export default Home;