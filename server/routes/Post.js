import express from 'express';
import {isLiked,getAudio,findOtherExamples , getPost , isExampleAdded} from '../controllers/Post/GET';
import {addPost,addUpvote} from '../controllers/Post/POST';
import {editPost} from '../controllers/Post/PUT';
import {deleteUpvote,deleteYourPost} from '../controllers/Post/DELETE';
const router = express.Router();


router.post('/api/posts/add' , addPost);
router.post('/api/posts/get' , getPost);
router.post('/api/posts/add-another-example',editPost);
router.post('/api/posts/find-another-example' , findOtherExamples);
router.get('/api/posts/get-audio' , getAudio);
router.post('/api/posts/delete-post' , deleteYourPost);
router.post('/api/posts/delete-upvote', deleteUpvote);
router.post('/api/posts/add-upvote' , addUpvote);
router.post('/api/posts/isLiked' , isLiked);
router.post('/api/posts/hasExample' ,isExampleAdded);

export default router;