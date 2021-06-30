import React from "react";
import {Header , Icon} from 'semantic-ui-react';

function Word ({word}){
 return (
     <>
         <div >
             <Header as="h2">{word}</Header>
         </div>

         <div style={{float : "right"}}>
             <Icon name='volume up'/>
         </div>
     </>
 )   
}

export default Word;