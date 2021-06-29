import express from 'express';
import {addPost , getPost , editPost , findOtherExamples} from '../controllers/Post';

const router = express.Router();


router.post('/api/posts/add' , addPost);

router.post('/api/posts/get' , getPost);
router.post('/api/posts/add-another-example',editPost);

router.get('/api/posts/find-another-example?:word' , findOtherExamples);

export default router;