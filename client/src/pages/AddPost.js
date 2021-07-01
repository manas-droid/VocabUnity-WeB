import React from 'react';
import { Button, Form ,Dropdown , Container} from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
const languageOptions = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Italian', text: 'Italian', value: 'Italian' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  ]
function AddPost(){
    const initPost = {
        word     : "",
        example  : "",
        language : "",
        loading  : false
    };

    const [post , setPost] = React.useState(initPost);
    const {currentUser} = useAuth();
    const {uid} = currentUser;

    const handleSubmitPost =  async ()=>{
        console.log(post);
        const sendResponse = {
            "userid"  : uid,
            "word"    : post.word,
            "example" : post.example,
            "language": post.language
        }
        if(post.example.length===0 || post.language.length===0 || post.word.length===0)return;


        setPost({...post , loading : true});
        const response = await fetch('http://localhost:5000/api/posts/add' , {method:"POST",headers:{'Content-Type' : 'application/json'},body : JSON.stringify(sendResponse)});
        const reponseJSON = await response.json();
        console.log(reponseJSON);
        setPost(initPost);
    }

return (
    <Container style={{ margin: "200px auto" }} text>
        <Form onSubmit={handleSubmitPost} loading={post.loading}>
            <Form.Input fluid label="Word" placeholder='word' onChange={(e) => setPost({ ...post, word: e.target.value })} />
            
            <strong><label > Language </label></strong>
            <Dropdown
                fluid
                selection
                options={languageOptions}
                placeholder='Select Language'
                onChange={(e) => setPost({ ...post, language: e.target.textContent })}
    
            />
            
            <Form.Input fluid label='Example' placeholder='Example' onChange={(e) => setPost({ ...post, example: e.target.value })} />

            <Button type='submit' secondary  >Submit</Button>
        </Form>
    </Container>
)
}

export default AddPost;