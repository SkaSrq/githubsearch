import React, {useContext, useState} from 'react'
import {
    Container,
    Form,
    Button,
    FormGroup,
    Label,
    Col,
    Input,
    Row,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from 'reactstrap';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ()=>{
    const context = useContext(UserContext);
    const [email,setEmail]= useState("");
    const [password, setPassword] = useState(""); 

    const handleSignUp =()=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(userCredential);
            context.setUser({email: user.email, uid:user.uid});
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            toast(errorMessage,{type:"error"})
        });

    };

    const handleSubmit = e =>{
        e.preventDefault();
        handleSignUp();
    };
    if(context.user?.uid){
        return <Redirect to="/"/>
    }
    return(
        <Container className = 'text-center'>
            <Row>
                <Col lg={6} className='offset-lg-3 mt-5'>
                    <Card>
                        <Form onSubmit={handleSubmit}>
                            <CardHeader className=''>SignUp here</CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Label for='email' sm={3}>Email</Label>
                                    <Col sm={9}>
                                        <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Provide your email'
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='password' sm={3}>Email</Label>
                                    <Col sm={9}>
                                        <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='Provide your password'
                                        value={password}
                                        onChange={e=>setPassword(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type='submit' block color='primary'>
                                    SignUp
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default Signup;