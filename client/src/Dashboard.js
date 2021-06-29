import React from "react";
import {Button, Card , Container , Form} from 'semantic-ui-react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from './context/AuthContext';

const BACKEND = 'http://localhost:5000/api/posts/add';
function Dashboard(){
    const {currentUser , logout} = useAuth();
    const history = useHistory();
    const wordRef = React.useRef();
    const wordExample = React.useRef();
    const languageRef = React.useRef();
    const [loading , setLoading] = React.useState(false);

    const handleLogout = async ()=>{ 
        try {
             await logout();  
            history.push('/login');  
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitPost = async ()=>{
        const { uid } = currentUser;
        const sendResponse = {
            "userid"  : uid,
            "word"    : wordRef.current.value,
            "example" : wordExample.current.value,
            "language": languageRef.current.value
        }

        setLoading(true);
        const response = await fetch(BACKEND , {method:"POST",headers:{'Content-Type' : 'application/json'},body : JSON.stringify(sendResponse)});
        setLoading(false);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }



    return <>
        <Container fluid text
            style={{
                margin: "30px"
            }}
        >
            <Card>
                <Card.Content><strong>Email</strong> : {currentUser.email}</Card.Content>
                <Card.Content><strong>Photo</strong> : {currentUser.photoURL}</Card.Content>
                <Card.Description textAlign="center">
                    <Button fluid primary as={Link} to="/update-profile">Update profile</Button>
                </Card.Description>
            </Card>
            <Form onSubmit = {handleSubmitPost} loading = {loading}>
                <Form.Field>
                    <label>Word</label>
                    <input placeholder='Word'     required ref={wordRef}/>
                </Form.Field>
                <Form.Field>
                    <label>Example</label>
                    <input placeholder='Example'  required ref={wordExample}/>
                </Form.Field>
                <Form.Field>
                    <label>language</label>
                    <input placeholder='language' required ref={languageRef}/>
                </Form.Field>
                <Button type='submit' primary fluid>Submit</Button>
            </Form>

            {/* <Button negative onClick={handleLogout}> Log out </Button> */}

        </Container>
    </>
}

export default Dashboard;