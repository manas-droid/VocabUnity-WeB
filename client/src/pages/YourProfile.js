import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Segment,Form ,Grid , Button, Loader , Header , Icon , Message} from "semantic-ui-react";

const BACKEND = 'http://localhost:5000/api/users/fetch-users';

function YourProfile(){
    const {currentUser,updateProfile} = useAuth();
    const {uid} = currentUser;
    const [user , setUser] = useState(null);


    useEffect(()=>{
       async function fetchData(){
            const response = await fetch(BACKEND , {
                method : "POST",
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({"id" : uid})
            });
            const jsonResponse = await response.json();
            setUser({
                "username" : jsonResponse.user.username,
                "photoURL" : jsonResponse.user.photoURL,
                "loading"  : false  
            })
       }
       fetchData();
    } , [uid]);

    const handleUpdateProfile = async ()=>{
       console.log(user);
       try {

            setUser({...user , "loading":true});
           const response = await fetch('http://localhost:5000/api/users/update-user' , {
               method:"POST",
               headers : {
                   "Content-Type":'application/json'
               },
               body : JSON.stringify({"id":uid , "username":user.username,"photoURL":user.photoURL})
           });
           console.log(response);
           const firebaseResponse = await updateProfile(user.photoURL ,user.username );

           setUser({ ...user , "loading":false , "message" : true});
           console.log(firebaseResponse);
       } catch (error) {
        console.log(error);   
       }

       
    }

    if(!user) return <Loader active />;


    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    <Icon name='user' /> Update Your Profile
                </Header>

                <Form onSubmit = {handleUpdateProfile} loading={user.loading}>
                    <Segment stacked>

                        <Form.Field>
                            <label>Photo URL</label>
                            <input placeholder='Enter Photo URL ' name="photoURL" type="text" required value={user.photoURL} onChange={(e)=>{setUser({...user , "photoURL" : e.target.value })}} />
                        </Form.Field>

                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Enter Name' type="text" name="username" required value={user.username} onChange={(e)=>{setUser({...user , "username" : e.target.value })}}/>
                        </Form.Field>

                        <Button primary type='submit' fluid>Update Profile</Button>
                    </Segment>
                </Form>
                {
                    user.message ? (
                        <Message attached='bottom' positive>
                            <Icon name='check' color='green'/>
                            Successfully Updated!
                        </Message>
                    ) : ""
                }

            </Grid.Column>
        </Grid>
    );
}

export default YourProfile;