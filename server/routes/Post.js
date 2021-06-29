import express from 'express';
import addPost from '../controllers/Post';

const router = express.Router();


router.post('/api/posts/add' , addPost);

export default router;