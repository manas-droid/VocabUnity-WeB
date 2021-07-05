import React, { useEffect, useState } from 'react';
import { Container, Card , Loader , Image, Icon , Header} from 'semantic-ui-react';
import Description from '../utils/DifferentExamples/Description';
import Word from '../utils/Word';
import {useAuth} from '../context/AuthContext';
const BACKEND = 'http://localhost:5000/api/posts/find-another-example';

function DifferentExamples(props){
    
    const word = props.location.search.split('=')[1];
    const [posts , setPosts] = useState(null);
    const {currentUser} = useAuth();
    const {uid} = currentUser;
 
    useEffect(()=>{
      (async function fetchData(){
        const response = await fetch(BACKEND , {
            method:"POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({"word":word,"userid":uid}),
        });
        const jsonResponse = await response.json();
        setPosts(jsonResponse);
    })();
    } , [word,uid]);

    console.log(posts);
	
    if(!props.match.params) return ;


    const {postid} = props.match.params;

    if(!posts) return <Loader active />

    if(posts.example.length === 0)  return <NoResultsFound />


    return (
    <Container style = {{margin :"100px auto"}}>
        <Card.Group itemsPerRow='1'>
            {
                posts.example.map((e)=>{
                    return (
                        <Card key = {e.postid} 
                        header={<Word word={e.word} language={e.language} isDashboard={false} />} 
                        meta = {`language : ${e.language}`} 
                        description = {<Description examples={e.example} postid={postid} userid={uid}/>}
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
            if(checkLikes.post) setIsLiked('');
            else setIsLiked('outline');
        })();
    } , [postid , userid]);
    
    
    async function handleLikes(){
        if(isLiked === 'outline') {
            setIsLiked('');
            setUpVote(upVote+1);
            await fetch('http://localhost:5000/api/posts/add-upvote' , { method:"POST", headers:{ 'Content-Type':'application/json'},body : JSON.stringify({"userid":userid , "postid":postid})});
        }
        else{ 
            setIsLiked('outline');
            setUpVote(upVote-1);
            await fetch('http://localhost:5000/api/posts/delete-upvote' , { method:"POST", headers:{ 'Content-Type':'application/json'},body : JSON.stringify({"userid":userid , "postid":postid})});
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




const NoResultsFound = ()=>{
    return(
    <Container style={{margin:"100px auto"}}>
        <Image  centered  src="https://listingdock.com/assets/img/features/noresults.jpg" size="large" />
        <Header textAlign="center"> Results Not Found </Header>
        <p style={{textAlign:"center"}}>
            Looks like you are the first person to add this word!
            Wait until someone posts something exciting!
        </p>
    </Container>
    )
}

export default DifferentExamples;