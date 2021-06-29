import React , {useRef} from 'react'

import { Button, Form,Container , Header , Card } from 'semantic-ui-react'
import { useAuth } from './context/AuthContext';
import {Link} from 'react-router-dom';

const Register = () => {  
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signUp }  = useAuth();

const handleSubmit = async (e)=>{ 

    e.preventDefault();
    if(passwordRef.current.value !== confirmPasswordRef.current.value) return;

    await signUp(emailRef.current.value , passwordRef.current.value);
 
}



return (
    <Container style={{ marginTop: "40px" }}>
        <Card raised centered style={{ padding: "20px", maxWidth: "500px", minWidth: "300px", width: "60%" }}>
            <Header textAlign="center" as="h1"> Sign Up </Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Enter email' type="email" required ref={emailRef} />
                </Form.Field>

                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Enter Password' type="password" required ref={passwordRef} />
                </Form.Field>

                <Form.Field >
                    <label>Confirm Password</label>
                    <input placeholder='Confirm Password' type="password" required ref={confirmPasswordRef} />
                </Form.Field>

                <Form.Field>
                    Already Have an Account?  <Link to="/login">Log in</Link>
                </Form.Field>

                <Button primary type='submit' fluid>Sign Up</Button>
            </Form>
        </Card>
    </Container>
  );

}

export default Register;