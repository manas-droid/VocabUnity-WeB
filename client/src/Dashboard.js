import React from "react";
import {Button, Card , Container , Form , Select} from 'semantic-ui-react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from './context/AuthContext';

const BACKEND = 'http://localhost:5000/api/posts/add';
function Dashboard(){
    const {currentUser , logout} = useAuth();
    const history = useHistory();
    const wordRef = React.useRef();
    const wordExample = React.useRef();
    const anotherExampleRef = React.useRef();
    const languageRef = React.useRef();
    const findOtherExampleRef = React.useRef();
    
    const [loading , setLoading] = React.useState(false);

    const [yourPost , setYourPost] = React.useState({});
    const [findOtherExamples , setFindOtherExamples] = React.useState([]);

    // const options = [
    //     { key: 1, text: 'english', value: 1 },
    //     { key: 2, text: 'german', value: 2 },
    //     { key: 3, text: 'spanish', value: 3 },
    //     { key: 4, text: 'italian', value: 4 },
    //     { key: 5, text: 'french', value: 5 }
    //   ];
      
    // const handleLogout = async ()=>{ 
    //     try {
    //          await logout();  
    //         history.push('/login');  
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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

    const handleGetYourPost = async ()=>{
        const {uid} = currentUser;

        try {

            setLoading(true);
            const response = await fetch('http://localhost:5000/api/posts/get' , {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({"userid" : uid}),
            });
            setLoading(false);
            console.log(response);
            const post = await response.json();
            console.log(post);
            setYourPost(post);
        } catch (e) {
            console.error(e);
        }
      
    }


    const handleSubmitEditPost = async ()=>{

        const anotherExample = anotherExampleRef.current.value;
        const {uid} = currentUser;
         const response = await fetch('http://localhost:5000/api/posts/add-another-example' , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({'example':anotherExample , 'userid':uid}), 
         });
        const jsonResponse = await response.json();
        console.log(jsonResponse);

    }


    const handleFindOtherExamples = async ()=>{

        const word = findOtherExampleRef.current.value;
        const response = await fetch(`http://localhost:5000/api/posts/find-another-example?word=${word}` , {
            method:"GET",
            headers : {
                'Content-Type' : 'application/json'
            },
        });
        const jsonResponse = await response.json();
        setFindOtherExamples(jsonResponse);

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
                    <input placeholder='example' required ref={wordExample}/>
                </Form.Field>
                <Form.Field>
                    <label>Language</label>
                    <input placeholder='language' required ref={languageRef}/>
                </Form.Field>
                <Button type='submit' primary fluid>Submit</Button>
            </Form>


            <Form onSubmit = {handleSubmitEditPost} loading = {loading}>
                
                <Form.Field>
                    <label>Add another Example to ladrón</label>
                    <input placeholder='Example'  required ref={anotherExampleRef}/>
                </Form.Field>
                <Button type='submit' primary fluid>Submit</Button>
            </Form>



            <Card>
                <Card.Meta>
                    <Button type='submit' primary fluid loading={loading}  onClick = {handleGetYourPost}>Get Your Post</Button>
                </Card.Meta>

                <Card.Description>
                    {JSON.stringify( yourPost , 2 , 2)}
                </Card.Description>
            </Card>


            <Form onSubmit={handleFindOtherExamples}>                
                <Form.Field>
                    <label>find other examples : </label>
                    <input placeholder='word'  required ref={findOtherExampleRef}/>
                </Form.Field>
                <Button type='submit' primary fluid>Submit</Button>
            </Form>

            <Card>
                <Card.Description>
                    {JSON.stringify(findOtherExamples)}
                </Card.Description>
            </Card>


            {/* <Button negative onClick={handleLogout}> Log out </Button> */}

        </Container>
    </>
}

export default Dashboard;