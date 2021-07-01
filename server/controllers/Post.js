import PostModel from "../database/models/Post";
import TextToSpeech from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator }from 'ibm-watson/auth';
import transFormData from "../utils/transformData";
import { createConnection } from "mysql2/promise";

const voice = {
    "German"  : "de-DE_BirgitV3Voice",
    "german"  : "de-DE_BirgitV3Voice",
    "Spanish" :  "es-ES_LauraV3Voice",
    "spanish" :  "es-ES_LauraV3Voice",
    "Italian" :  "it-IT_FrancescaV3Voice",
    "italian" :  "it-IT_FrancescaV3Voice",
    "French"  :  "fr-FR_ReneeV3Voice",
    "french"  :  "fr-FR_ReneeV3Voice",
    "English" :  "en-GB_CharlotteV3Voice",
    "english" :  "en-GB_CharlotteV3Voice"
};



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


const getAudio = async (req, res)=>{
    const {word , language} = req.query;
    
    const textToSpeech = new TextToSpeech({
        authenticator: new IamAuthenticator({
          apikey: 'U2MS58-ZeMq0RN7E-UesOMk8jNHOpMNAqoffQKbz_pf5',
        }),
        serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/6fcfd550-e006-48de-b90d-8090c68ac778',
      });


    const synthesizeParams = {
        text: word,
        accept: 'audio/wav',
        voice:voice[language],
      };
    const response = await textToSpeech.synthesize(synthesizeParams);

    return response.result.pipe(res);
}



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


const isLiked = async (req,res)=>{
    const {userid , postid} = req.body;

    try {
        const response = await PostModel.isLiked(userid,postid);
        console.log(response[0][0]);
        const  check = response[0][0] ? true : false;
        return res.status(200).json({"post": check , "ok":true});
    } catch (error) {

        console.log(error);
        return res.status(503).json({"post":"failed" , "ok":false});
    }
}


export {addPost , getPost , editPost , findOtherExamples , getAudio , deleteYourPost , addUpvote , deleteUpvote , isLiked};