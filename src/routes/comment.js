import express from 'express';
import middleware from '../middleware/middleware';
import { Post, Comment } from '../db';

const router = express.Router();

// 댓글 목록
router.get('/list/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      res.status(404).json({
        message: 'post not found',
      });
    }

    const comments = await Comment.findAll({
      where: {
        postId,
      },
    });

    res.json({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 댓글 작성
router.post('/:postId', middleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const user = req.user;

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      res.status(404).json({
        message: 'post not found',
      });
    }

    const comment = await Comment.create({
      content,
      userId: user.id,
      postId,
    });

    res.json({
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 댓글 수정
router.put('/:commentId', middleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const user = req.user;

    let comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      res.status(404).json({
        message: 'comment not found',
      });
    }

    if (comment.userId !== user.id) {
      res.status(401).json({
        message: 'not allow',
      });
    }

    comment = await Comment.update(
      { content },
      {
        where: {
          id: commentId,
        },
      },
    );

    res.json({ comment });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

// 댓글 삭제
router.delete('/:commentId', middleware, async (req, res) => {
  try {
    const user = req.user;
    const { commentId } = req.params;

    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      res.status(404).json({
        message: 'comment not found',
      });
    }
    if (comment.userId !== user.id) {
      res.status(401).json({
        message: 'not allow',
      });
    }

    await Comment.destroy({
      where: {
        id: commentId,
      },
    });

    res.json({
      message: 'comment has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
