const express = require('express');
const router = express.Router();
const postsRouter = require('./post');
const userRouter = require('./user');
const commentsRouter = require('./comment');
const likeRouter = require('./like');

router.use('/api/post', postsRouter);
router.use('/api/user', userRouter);
router.use('/api/comment', commentsRouter);
router.use('/api/like', likeRouter);

router.use('/ping', (req, res, next) => {
  return res.status(200).json({ message: 'pong' });
});

module.exports = router;
