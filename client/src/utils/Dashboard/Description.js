import  React from "react";
import { List } from "semantic-ui-react";

const  Description = ({examples})=>{

    return <List   verticalAlign='middle'size="large" relaxed="very">
      {
          examples.map(e =><Examples key={e.exampleid} sentence={e.example} />)
      }
    </List>
}


const Examples = ({sentence})=>{
    return (
        <List.Item>
          <List.Content>{sentence}</List.Content>
        </List.Item>
  )
}
export default Description;


