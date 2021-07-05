import PostModel from "../../database/models/Post";
import TextToSpeech from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator }from 'ibm-watson/auth';
import transFormData from "../../utils/transformData";
import {config} from 'dotenv';

config();

const findOtherExamples = async (req,res)=>{
    const {word,userid}  = req.body;

    try {
        const response = await PostModel.findOtherExamples(word,userid);
        const final_response = transFormData(response , true);
        return res.status(200).json({"posts" : final_response , "ok":true});

    } catch (error) {
        return res.status(503).json({"posts" : "failed to fetch" , "ok":false});
    }

}

const getPost = async (req,res)=>{
    const {userid} = req.body;
    if(!userid) return res.status(403).json({"posts" :  "user not logged in" , "ok":false});

    try {
        const response = await PostModel.getPost(userid);
        const final_response = transFormData(response , false);
        return res.status(200).json({"posts" : final_response , "ok":true});
    } catch (error) {
        console.log("Error GET: ",error);
        return res.status(500).json({"posts" : "failed select the post" , "ok":false});
    }
}

const getAudio = async (req, res)=>{
    const {word , language} = req.query;

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


    const textToSpeech = new TextToSpeech({
        authenticator: new IamAuthenticator({
          apikey: process.env.IBM_WATSON_API_KEY,
        }),
        serviceUrl:process.env.IBM_WATSON_SERVICE_URL,
      });


    const synthesizeParams = {
        text: word,
        accept: 'audio/wav',
        voice:voice[language],
      };
    const response = await textToSpeech.synthesize(synthesizeParams);

    return response.result.pipe(res);
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

const isExampleAdded  = async (req,res)=>{
    const {userid , exampleid} = req.body;
    try {
        const response = await PostModel.checkIfExampleAdded(userid,exampleid);
        const check = response[0][0] ? true :false;
        return res.status(200).json({"example":check ,"ok":true});
    } catch (error) {
        console.log(error);
        return res.status(503).json({"example":"failed" , "ok":false});
    }
}


export {
    findOtherExamples,
    isLiked,
    getAudio,
    getPost,
    isExampleAdded
};
