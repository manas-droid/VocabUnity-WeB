import React, { useEffect, useState } from 'react';
import { Container, Card , Loader , Image, Icon} from 'semantic-ui-react';
import Description from '../utils/Description';
import Word from '../utils/Word';
import {useAuth} from '../context/AuthContext';
const BACKEND = 'http://localhost:5000/api/posts/find-another-example';

function DifferentExamples(props){
    const word = props.location.search.split('=')[1];
    const [posts , setPosts] = useState(null);
    const {currentUser} = useAuth();
    const {uid} = currentUser;
 
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
    

    if(!posts) return <Loader active />


    return (
    <Container style = {{margin :"200px auto"}}>
        <Card.Group itemsPerRow='1'>
            {
                posts.example.map((e)=>{
                    return (
                        <Card key = {e.postid} 
                        header={<Word word={e.word} language={e.language}/>} 
                        meta = {`language : ${e.language}`} 
                        description = {<Description examples={e.example} isExample = {true} />}
                        extra={<Extra userimage={e.userimage} username={e.username} upvote={e.upvote} userid={uid} postid={e.postid}/>}
                        />
                    )
                })
            }

        </Card.Group>
    </Container>
    );
}


const Extra = ({ userimage , username , upvote,userid,postid})=>{
    const [upVote , setUpVote] = useState(upvote); 
    const [isLiked , setIsLiked] = useState('outline');

    useEffect(()=>{
        (async function fetchData(){
        
            const response = await fetch('http://localhost:5000/api/posts/isLiked' , {
                method:"POST",
                headers:{
                    "Content-Type":'application/json'
                },
                body : JSON.stringify({"userid":userid,"postid":postid})
            })
            const checkLikes = await response.json();
            console.log(checkLikes);
            if(checkLikes.post) setIsLiked('');
            else setIsLiked('outline');
        })();
    } , [postid , userid]);
    
    
    async function handleLikes(){
        if(isLiked === 'outline') {
            setIsLiked('');
            setUpVote(upvote+1);

            const response = await fetch('http://localhost:5000/api/posts/add-upvote' , {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({"userid":userid , "postid":postid})
            });

            console.log(await response.json());
        }
        else{ 
            setIsLiked('outline');
            setUpVote(upvote);
        }
    }


    return (
    <div>
        <div style={{float:"left"}}>
            <Image src={userimage} avatar />
            <span>Username: {username}</span>
        </div>

        <div style={{float:"right"}}>
            <Icon name={`thumbs up ${isLiked}`}  size="large" style={{marginRight : 10, cursor:"pointer"}} onClick={handleLikes}  />
            {upVote} votes
        </div>
    </div>
    );
}

export default DifferentExamples;