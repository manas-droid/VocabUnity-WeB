import React, { useEffect, useState } from "react";
import {Segment, Header , Icon , Container , Card , Loader , Button} from 'semantic-ui-react';
import {useAuth} from '../context/AuthContext';
import {Link} from 'react-router-dom';
import Description from "../utils/Description";
import Word from "../utils/Word";
import AddPost from "../components/AddPost";
function Dashboard(props){

    const { currentUser } = useAuth();
    
    const {uid}  = currentUser;
    const [post , setPost] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            const response = await fetch('http://localhost:5000/api/posts/get' , {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({"userid" : uid}),
            });

            const jsonResponse = await response.json();
            setPost(jsonResponse);
            return;
        }
        fetchData();
    } , [uid]);


    if(!post) return <Loader  active  />
    if(!post.ok) return <>Failed to get response</>
    if(post.posts.length===0) return <IfPostDoesNotExist/>
    if(!currentUser) return props.history.push('/login');

    return(
        <Container style = {{margin :"200px auto"}}>
            <Card.Group itemsPerRow='1'>
                {
                    post.posts.map((p)=>{
                        return (
                            <Card key = {p.postid} 
                            header={<Word word={p.word} language={p.language}/>} 
                            meta = {`language : ${p.language}`} 
                            description = {<Description examples={p.example} />}
                            extra ={<Extra word={p.word} userid={uid} postid={p.postid}/>}
                            />
                        )
                    })
                }

            </Card.Group>
        </Container>

    )
}


const handleDeletePost = async (userid,postid)=>{
    const URL = 'http://localhost:5000/api/posts/delete-post';

    try {
        const response = await fetch(URL , {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body : JSON.stringify({"userid":userid , "postid":postid}),
        })

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
    } catch (error) {
        console.log(error);
    }

};



const Extra = ({word , userid , postid})=>{
    const [disable , setDisable] = useState(false );


return<Container>
        <Link to = {`/search-examples?word=${word}`} style={{float : 'left'}}>
            check out for other examples
            <span style={{marginLeft:5}}>
                <Icon name='arrow right' />
            </span>
        </Link>

        <Button  disabled = {disable}   style={{float : 'right'}} negative onClick= {()=>{  
            setDisable(true);
            handleDeletePost(userid,postid); 
            }}> Delete </Button>
    </Container>
}



const IfPostDoesNotExist = ()=>(
<Segment placeholder
    style = {{
        margin :"200px auto",
        maxWidth : 500,
        backgroundColor : "white"
    }}
>
    <Header icon>
      <Icon name='add'/>
        Add a Word to your Vocab
    </Header>
    <AddPost/>
</Segment>   
)





export default Dashboard;



/* 
{ 
"posts": 
[ 
    {   "postid": 3, 
        "language": "german", 
        "example": [ "Ich habe noch nicht gefruhstuckt", "heute, habe ich nicht gefrühstückt.", 
        "Was hast du zum Frühstück" ], 
        "word": "Fruhstucken" 
    }, 
    { 
        "postid": 6, 
        "language": "spanish", 
        "example": [ "A dónde fue el ladrón?" ], 
        "word": "ladrón" 
    } 
], 
"ok": true 
}


*/