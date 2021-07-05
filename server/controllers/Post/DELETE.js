import PostModel from "../../database/models/Post";

const deleteYourPost = async (req,res)=>{
    const {userid , postid} = req.body;

    try {
        await PostModel.deleteYourPost(postid , userid);
        return res.status(200).json({"post" : "deleted post successfully" , "ok":true});
    } catch (error) {
        console.log("DELETE POST: ",error);
        return res.status(503).json({"post" : "couldn't post deleted" , "ok":false});
    }
}



const deleteUpvote = async (req,res)=>{
    const {userid,postid} = req.body;
    try {
        await PostModel.deleteUpvote(userid,postid);
        return res.status(200).json({"post" : "upvote removed successfully" , "ok":true});
    } catch (error) {
        console.log("REMOVE UPVOTE: ",error);   
        return res.status(503).json({"post" : "failed to remove an upvote" , "ok":false});
    }
}



export {
    deleteUpvote,
    deleteYourPost
}

