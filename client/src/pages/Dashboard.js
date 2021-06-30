import React, { useEffect, useState } from "react";
import {Segment, Header , Icon , Button , Container , Card , Loader} from 'semantic-ui-react';
import {useAuth} from '../context/AuthContext';
import {Link} from 'react-router-dom';
import Description from "../utils/Description";
import Word from "../utils/Word";
function Dashboard(props){

    const { currentUser } = useAuth();
    
    const {uid}  = currentUser;
    const [post , setPost] = useState(null);

    useEffect(()=>{
        console.log("here");

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

    console.log(post);

    if(!post) return <Loader style = {{margin :"200px auto"}} />


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
                            header={<Word word={p.word}/>} 
                            meta = {`language : ${p.language}`} 
                            description = {<Description examples={p.example} />}
                            extra ={<SearchOtherExamples word={p.word}/>}
                            />
                        )
                    })
                }

            </Card.Group>
        </Container>

    )
}




const SearchOtherExamples = ({word})=>(
    <Link to = {`/search-examples?word=${word}`}>
        check out for other examples
        <span style={{marginLeft:5}}>
            <Icon name='arrow right' />
        </span>
    </Link>
)



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
    <Button primary>Add Word</Button>
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