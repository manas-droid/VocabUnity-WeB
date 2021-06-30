import React, { useEffect, useState } from 'react';
import { Container, Card , Loader , Image, Icon} from 'semantic-ui-react';
import Description from '../utils/Description';
import Word from '../utils/Word';
const BACKEND = 'http://localhost:5000/api/posts/find-another-example';

function DifferentExamples(props){
    const word = props.location.search.split('=')[1];
    const [posts , setPosts] = useState(null);
    console.log(word);

    useEffect(()=>{
        async function fetchData(){
        const response = await fetch(`${BACKEND}?word=${word}` , {
            method:"GET",
            headers : {
                'Content-Type' : 'application/json'
            },
        });
        const jsonResponse = await response.json();
        setPosts(jsonResponse);
    }
    fetchData();
    } , [word])
    

    if(!posts) return <Loader style = {{margin :"200px auto"}} />


    return (
    <Container style = {{margin :"200px auto"}}>
        <Card.Group itemsPerRow='1'>
            {
                posts.example.map((e)=>{
                    return (
                        <Card key = {e.postid} 
                        header={<Word word={e.word}/>} 
                        meta = {`language : ${e.language}`} 
                        description = {<Description examples={e.example} isExample = {true} />}
                        extra={<Extra userimage={e.userimage} username={e.username} upvote={e.upvote}/>}
                        />
                    )
                })
            }

        </Card.Group>
    </Container>
    );
}


const Extra = ({ userimage , username , upvote })=>{
    return (
    <div>
        <div style={{float:"left"}}>
            <Image src={userimage} avatar />
            <span>Username: {username}</span>
        </div>

        <div style={{float:"right"}}>
            <Icon name="thumbs up outline" size="large" style={{marginRight : 10}}/>
            <Icon name="thumbs down outline" size="large"/>
            {upvote} votes
        </div>


    </div>
    )
}

export default DifferentExamples;