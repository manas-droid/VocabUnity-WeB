import  React , { useEffect, useState } from "react";
import { List ,Icon , Label} from "semantic-ui-react";
import { useHistory } from "react-router";

const  Description = ({examples,userid,postid})=>{

    return <List   verticalAlign='middle'size="large" relaxed="very">
      {
          examples.map(e =><Examples key={e.exampleid} exampleid={e.exampleid}  sentence={e.example} postid={postid} userid={userid} />)
      }
    </List>
}


const Examples = ({sentence ,postid,userid,exampleid})=>{
    const history = useHistory();
    const [exampleAdded , setExampleAdded] = useState(false);
    useEffect(()=>{
        (
            async function checkIfHasExample(){
                const response = await fetch("http://localhost:5000/api/posts/hasExample" , {
                    method:"POST",
                    headers:{
                        "Content-Type":'application/json'
                    },
                    body : JSON.stringify({"userid":userid,"exampleid":exampleid})
                });

                const checkExample = await response.json();
                if(checkExample.example) setExampleAdded(true);
                else setExampleAdded(false);
            }
        )();

    } , [userid , exampleid]);

    
    async function handleAddAnotherExample(){
        console.log("here");
        setExampleAdded({"name":"check" , "color":"green" , "label":"added" , "disable" : false});

        const response = await fetch('http://localhost:5000/api/posts/add-another-example' , {
            method : "POST",
            headers : {
                "Content-Type":'application/json',
            },
            body : JSON.stringify({userid,postid,"example":sentence,exampleid}),
        });
        const JSONREPONSE = await response.json();
        console.log(JSONREPONSE);
        return history.push('/');
    }

    return (
        <List.Item>
            <List.Content floated='right'>
                {
                
                !exampleAdded ? (
                <Label onClick={handleAddAnotherExample} style={{ cursor: "pointer" }}>
                    <Icon name="add"  /> add to vocab
                </Label>    
                ) : (
                <Label disabled>
                    <Icon name="check"  color="green"/> added
                </Label> 
                )
                }
            </List.Content>
          <List.Content>{sentence}</List.Content>
        </List.Item>
  )
}
export default Description;


