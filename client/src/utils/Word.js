import React, { useState , useRef } from "react";
import {Header , Button, Icon } from 'semantic-ui-react';

function Word ({word,language}){
    const [loading , setLoading] = useState(false);
    const sound = useRef();
    const BACKEND = `http://localhost:5000/api/posts/get-audio?word=${word}&language=${language}`;

    function handleAudioPlay(){
        setLoading(true);  
        const audio = sound.current;
        audio.play();
        console.log("here");
    }


 return (
     <>
         <div >
             <Header as="h2">{word}</Header>
         </div>

         <div style={{float : "right"}}>
            <Icon name="volume up" onClick={handleAudioPlay} loading ={loading} style={{cursor : "pointer"}} />
            <audio src={BACKEND} ref={sound}  onPause={()=>setLoading(false)}></audio>
         </div>
     </>
 )   
}

export default Word;