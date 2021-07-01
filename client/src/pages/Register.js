import React , {useState} from 'react'

import { Button, Form , Header , Segment , Grid , Image , Message } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
import {Link , useHistory} from 'react-router-dom';

const Register = () => {  
    const history = useHistory();

    const initUser = {
        email : "",
        password : "",
        confirmPassword : "",
        loading : false
    };


    const { signUp }  = useAuth();
    const [user , setUser] = useState(initUser);

const handleSubmit = async (e)=>{ 

    e.preventDefault();

    if(user.password !== user.confirmPassword) return;
    setUser({...user , loading:true});
    await signUp(user.email , user.password);
    setUser({...user , loading:false});
    history.push("/login");
}



return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color="blue" textAlign='center'>
                <Image src='https://toppng.com/uploads/preview/community-icon-one-stop-solution-icon-11553449230cw4322bto3.png' style={{borderRadius: "50px"}} /> 
                Sign Up to be part of the Vocabunity
            </Header>
            <Form onSubmit={handleSubmit} loading={user.loading}>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange = {(e)=>{setUser({...user , email:e.target.value})}}/>

                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange = {(e)=>{setUser({...user , password:e.target.value})}} />
                    
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' onChange = {(e)=>{setUser({...user , confirmPassword:e.target.value})}}  />

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