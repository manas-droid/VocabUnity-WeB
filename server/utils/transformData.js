// what transformData does :

/* {
    postid : 1,
    language : german | italian | english | french | spanish,
    example :  [example1,example2,......],
    word  : "some_word"   
 }*/


const transFormData = (response , isAnotherExample)=>{

    const post  = response[0].reduce((overall , current)=>{ 
    if(overall.get(current.postid)){
        overall.get(current.postid).example.push({exampleid : current.exampleid  , example:current.example });
    }else{

        if(!isAnotherExample) overall.set(current.postid , {"postid": current.postid , "language":current.language , "example": [{example: current.example , exampleid : current.exampleid }] , "word" : current.word})
        else overall.set(current.postid , {"postid": current.postid , "language":current.language , "example": [{example: current.example , exampleid : current.exampleid }] , "word" : current.word , "username" : current.username , "userimage" : current.userimage , "upvote" : current.upvote})
    } 
    return overall;
    }, new Map());
    
    const final_response = [];

    for (let value of post.values()) {
        final_response.push(value)
    }
    return final_response;
}
export default transFormData;