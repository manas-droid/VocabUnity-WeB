import PostModel from "../../database/models/Post";

const editPost = async (req,res)=>{
    console.log(req.body);

    const {userid , example , postid , exampleid} = req.body;
    
    if(!userid) return res.status(403).json({"post" :  "user not logged in" , "ok":false});

    try {
       await PostModel.addAnotherExample(postid,userid,example,exampleid);
       return res.status(200).json({"example" : "successful" , "ok":true});
    } catch (error) {
        console.log("ADD ANOTHER EXAMPLE: ",error);
      return res.status(503).json({"example":"failed to add example" , "ok" : false});
    }
}

export{
    editPost
}
