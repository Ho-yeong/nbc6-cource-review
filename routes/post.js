const express = require('express');
const { Post, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
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
    // const posts = await Post.findAll({
    //   include: [
    //     { model: User, attributes: ['email'] },
    //   ],
    // });

    const posts = await sequelize.query(
      `
      SELECT a.id, a.title, a.content, a.createdAt, c.email, COUNT(b.contentId) AS like_count
      FROM posts as a
          LEFT JOIN Likes as b ON a.id = b.contentId
          LEFT JOIN Users as c on a.userId = c.id
      GROUP BY a.id, a.createdAt ORDER BY like_count DESC;
    `,
      // raw query 를 보낼대 결과의 형식을 지정
      { type: QueryTypes.SELECT },
    );

    res.json({ posts });
  } catch (error) {
    console.log(error);
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

    // const post = await Post.findOne({ where: { id: postId } });

    const post = await sequelize.query(
      `
        SELECT a.id, a.title, a.content, a.createdAt, c.email, COUNT(b.contentId) AS like_count
        FROM posts as a
            LEFT JOIN Likes as b ON a.id = b.contentId
            LEFT JOIN Users as c on c.id = a.userId
        WHERE a.id = :post_id LIMIT 1;
      `,
      { replacements: { post_id: postId }, type: QueryTypes.SELECT },
    );

    if (!post[0]) {
      res.status(404).json({
        message: 'post not found',
      });
    }

    res.json({ post: post[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
