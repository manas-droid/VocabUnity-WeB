import PostModel from "../../database/models/Post";

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


const addUpvote = async (req,res)=>{
    const {userid,postid} = req.body;
    try {
        await PostModel.addUpvote(userid,postid);
        return res.status(200).json({"post" : "upvote added successfully" , "ok":true});

    } catch (error) {
        console.log("ADD UPVOTE: ",error);
        return res.status(503).json({"post" : "failed to add an upvote" , "ok":false});
    }
}


export {
    addPost,
    addUpvote,
}