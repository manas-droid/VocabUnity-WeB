import PostModel from "../database/models/Post";


const addPost = async (req,res)=>{
    const {userid , word ,example , language} = req.body; 
    if(!userid) return res.status(403).json({"post" :  "user not logged in" , "ok":false});
    try {
        await PostModel.addPost(userid,word,language,example);
        return res.status(200).json({"post":"successfully added" , "ok":true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"post":"failed to add" , "ok":false});
    }
}


const getPost = async (req,res)=>{
    const {userid} = req.body;
    if(!userid) return res.status(403).json({"post" :  "user not logged in" , "ok":false});

    try {
        const response = await PostModel.getPost(userid);
        const final_response = transFormData(response , false);
        return res.status(200).json({"posts" : final_response , "ok":true});
    } catch (error) {
        console.log("Error GET: ",error);
        return res.status(500).json({"post" : "failed select the post" , "ok":false});
    }
}


const editPost = async (req,res)=>{
    const {userid , example} = req.body;
    if(!userid) return res.status(403).json({"post" :  "user not logged in" , "ok":false});

    try {
       await PostModel.addAnotherExample(5,userid,example);
       return res.status(200).json({"example" : "successful" , "ok":true});
    } catch (error) {
        console.log("ADD ANOTHER EXAMPLE: ",error);
      return res.status(503).json({"example":"failed to add example" , "ok" : false});
    }
}


const findOtherExamples = async (req,res)=>{
    const {word}  = req.query;

    try {
        const response = await PostModel.findOtherExamples(word);
        const final_response = transFormData(response , true);
        return res.status(200).json({"example" : final_response , "ok":true});
        
    } catch (error) {
        return res.status(503).json({"example" : "failed to fetch" , "ok":false});
    }

}


 
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


export {addPost , getPost , editPost , findOtherExamples};