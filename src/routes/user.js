import express from 'express';
import { User } from '../db/models';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../constants';

const router = express.Router();

// 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.create({
      email,
      password,
    });

    res.json({
      message: 'signup success',
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
    });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: 'check email or password',
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        message: 'user not found',
      });
    }
    if (user.password !== password) {
      res.status(401).json({
        message: 'check email or password',
      });
    }

    const token = await jwt.sign({ id: user.id, email: user.email }, JWT_KEY);

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
    });
  }

  console.log('login');
});

module.exports = router;
