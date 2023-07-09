import express from 'express';
import { Like } from '../db';
import middleware from '../middleware/middleware';

const router = express.Router();

// 좋아요 and 취소
router.post('/', middleware, async (req, res) => {
  try {
    const user = req.user;
    // true 일 경우에는 삭제 false 일 경우에는 생성
    const { isLiked, contentId } = req.body;
    // 현재는 like 가능한 content 가 post 밖에 없어서 타입검사안함

    const param = {
      userId: user.id,
      contentId,
    };

    if (isLiked) {
      await Like.destroy({
        where: param,
      });
    } else {
      const check = await Like.findOne({
        where: param,
      });
      if (check) {
        res.status(400).json({
          message: 'you already has liked',
        });
      }

      await Like.create(param);
    }

    res.json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
