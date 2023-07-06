const express = require('express');
const { Post } = require('../models');
const middleware = require('../middleware/middleware');
const router = express.Router();

// 글 작성
router.post('/', middleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    const result = await Post.create({
      title,
      content,
      userId: user.id,
    });

    res.json({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 글 목록
router.get('/list', async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json({ posts });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 글 조회
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    if (!postId) {
      res.status(400).json({
        message: 'post not found',
      });
    }

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      res.status(404).json({
        message: 'post not found',
      });
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
