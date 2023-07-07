import express from 'express';
import postsRouter from './post';
import userRouter from './user';
import commentsRouter from './comment';
import likeRouter from './like';

const router = express.Router();

router.use('/api/post', postsRouter);
router.use('/api/user', userRouter);
router.use('/api/comment', commentsRouter);
router.use('/api/like', likeRouter);

router.use('/ping', (req, res, next) => {
  return res.status(200).json({ message: 'pong' });
});

module.exports = router;
