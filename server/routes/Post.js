import express from 'express';
import {addPost , getPost , editPost , findOtherExamples , getAudio , deleteYourPost , deleteUpvote , addUpvote , isLiked} from '../controllers/Post';

const router = express.Router();


router.post('/api/posts/add' , addPost);
router.post('/api/posts/get' , getPost);
router.post('/api/posts/add-another-example',editPost);
router.get('/api/posts/find-another-example' , findOtherExamples);
router.get('/api/posts/get-audio' , getAudio);
router.post('/api/posts/delete-post' , deleteYourPost);
router.post('/api/posts/delete-upvote', deleteUpvote);
router.post('/api/posts/add-upvote' , addUpvote);
router.post('/api/posts/isLiked' , isLiked);

export default router;