import express from 'express';
import postsRouter from './post';
import userRouter from './user';
import commentsRouter from './comment';
import likeRouter from './like';

const router = express.Router();

router.use('/post', postsRouter);
router.use('/user', userRouter);
router.use('/comment', commentsRouter);
router.use('/like', likeRouter);

module.exports = router;
