import React , {useRef} from 'react';
import { Button, Form , Header , Segment , Grid , Image , Message} from 'semantic-ui-react'
import {Link , useHistory} from "react-router-dom";
import {useAuth} from '../context/AuthContext';

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const history = useHistory();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        if(emailRef.current.value.length === 0  || passwordRef.current.value.length === 0 ) return;     
        await login(emailRef.current.value , passwordRef.current.value);
        history.push('/');       
    }
    

return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color="blue" textAlign='center'>
                <Image src='https://toppng.com/uploads/preview/community-icon-one-stop-solution-icon-11553449230cw4322bto3.png' style={{borderRadius: "50px"}} /> Log-in to your account
            </Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />

                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />

                    <Button primary fluid size='large'>Login</Button>
                </Segment>
            </Form>
            <Message>
                 New to us? <Link to='/signup'>Sign Up</Link>
            </Message>

        </Grid.Column>
    </Grid>
    
);

}

export default Login;