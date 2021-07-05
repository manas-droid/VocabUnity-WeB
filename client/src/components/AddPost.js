import React from 'react'
import { Button, Modal , Form ,Dropdown} from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
const languageOptions = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'French', text: 'French', value: 'French' },
    { key: 'German', text: 'German', value: 'German' },
    { key: 'Italian', text: 'Italian', value: 'Italian' },
    { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  ]
                  
function AddPost() {
    const initPost = {
        word     : "",
        example  : "",
        language : "",
        loading  : false
    };

    const [open, setOpen] = React.useState(false)
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
        setPost({...post , loading : true});
        const response = await fetch('http://localhost:5000/api/posts/add' , {method:"POST",headers:{'Content-Type' : 'application/json'},body : JSON.stringify(sendResponse)});
        const reponseJSON = await response.json();
        console.log(reponseJSON);
        setPost(initPost);
    }


    return (
        <Modal
            closeIcon
            onClose={() =>{ setOpen(false);  setPost(initPost); }}
            onOpen={() => setOpen(true)  }
            open={open}
            trigger={<Button primary>Add Word</Button>}
        >
            <Modal.Header>Add Word to Your Vocab</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form  onSubmit = {handleSubmitPost} loading={post.loading}>
                        <Form.Input fluid label="Word"  placeholder='word'  onChange={(e)=>setPost({...post , word : e.target.value})}/>
                        <Dropdown
                            fluid
                            selection
                            options={languageOptions}
                            placeholder='Select Language'
                            onChange={(e)=>setPost({...post , language : e.target.innerText})}
                        />
                        <Form.Input fluid label='example' placeholder='example' onChange={(e)=>setPost({...post , example : e.target.value})} />

                        <Button type='submit' secondary fluid >Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );


}

export default AddPost;
