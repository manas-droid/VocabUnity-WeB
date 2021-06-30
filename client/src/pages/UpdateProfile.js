import React  from 'react';
import {Form , Button , Container} from 'semantic-ui-react';
import {useAuth} from '../context/AuthContext';
function UpdateProfile(){
    const {updateProfile} = useAuth();
    const photoRef = React.useRef();
    const nameRef = React.useRef();


    const handleSubmit = async ()=>{
        try {
            const result = await updateProfile(photoRef.current.value ,nameRef.current.value);
            console.log(result);
        } catch (error) {
            console.error(error);
        }      
    }

    return (
    <Container fluid text
        style = {{
            marginTop : "40px"
        }}
    >   
    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Photo URL</label>
            <input placeholder='Enter Photo URL ' type="text" required ref={photoRef} />
        </Form.Field>

        <Form.Field>
            <label>Name</label>
            <input placeholder='Enter Name' type="text" required ref={nameRef} />
        </Form.Field>

        <Button primary type='submit' fluid>Update Profile</Button>
    </Form>
    </Container>
    );

}

export default UpdateProfile;