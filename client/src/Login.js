import React , {useRef , useEffect} from 'react';
import { Button, Form ,Container , Header , Card} from 'semantic-ui-react'
import {Link , useHistory} from "react-router-dom";
import {useAuth} from './context/AuthContext';

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const history = useHistory();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if(emailRef.current.value.length === 0  || passwordRef.current.value.length === 0 ) return;     
        const result = await login(emailRef.current.value , passwordRef.current.value);

        history.push('/');       
    }
    

return (
    <Container style = {{ marginTop : "40px"}}>
     <Card raised centered style = {{ padding : "20px", maxWidth:"500px",minWidth:"350px", width:"60%"}}>
     <Header textAlign = "center" as="h1"> Login </Header>
    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Email</label>
            <input placeholder='Enter email' type="email" required ref={emailRef} />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input placeholder='Enter Password' type="password" required ref={passwordRef} />
        </Form.Field>

        <Form.Field>
            Don't Have an Account Yet? <Link to="/signup">Sign Up</Link>
        </Form.Field>
        <Button primary type='submit' fluid>Log In</Button>
    </Form>
    </Card>
    </Container>
)

}

export default Login;