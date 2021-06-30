import React , {useRef} from 'react'

import { Button, Form , Header , Segment , Grid , Image , Message } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
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
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color="blue" textAlign='center'>
                <Image src='https://toppng.com/uploads/preview/community-icon-one-stop-solution-icon-11553449230cw4322bto3.png' style={{borderRadius: "50px"}} /> 
                Sign Up to be part of the Vocabunity
            </Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />

                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                    
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' />

                    <Button primary fluid size='large'>Sign Up</Button>
                </Segment>
            </Form>
            <Message>
                 Already have an account? <Link to='/login'>login</Link>
            </Message>

        </Grid.Column>
    </Grid>
  );

}

export default Register;




/*
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
*/