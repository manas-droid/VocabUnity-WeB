import React, { useState , useRef } from "react";
import {Header, Icon } from 'semantic-ui-react';

function Word ({word,language , isDashboard}){
    const [loading , setLoading] = useState(false);
    const sound = useRef();
    const BACKEND = `http://localhost:5000/api/posts/get-audio?word=${word}&language=${language}`;

    function handleAudioPlay(){
        setLoading(true);  
        const audio = sound.current;
        audio.play();
    }


 return (
     <>
         <div>
             <Header as="h2">{word}</Header>
         </div>
       {  
        isDashboard &&(
            <div style={{float : "right"}}>
                <Icon name="volume up" onClick={handleAudioPlay} disabled ={loading} style={{cursor : "pointer"}} />
                <audio src={BACKEND} ref={sound}  onPause={()=>setLoading(false)}></audio>
            </div>
            )
        }
     </>
 )   
}

export default Word;