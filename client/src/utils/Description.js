
import { List , Button} from "semantic-ui-react";


const  Description = ({examples , isExample})=>{

    return <List verticalAlign='middle'>
      {
          examples.map((e , i)=><Examples key={e.exampleid} sentence={e.example} isExample = {isExample}/>)
      }
    </List>
}


const Examples = ({sentence , isExample})=>{
    return <List.Item>
        {
           isExample?( 
            <List.Content floated='right'>
                <Button secondary >Add to your Vocab</Button>
            </List.Content> ) : ""
        }
        <List.Content >{sentence}</List.Content>
    </List.Item>
}
export default Description;


