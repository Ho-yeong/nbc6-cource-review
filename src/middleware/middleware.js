import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';
import { User } from '../db';

const middleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'authorization error' });
    }

    const decodedToken = jwt.verify(token, JWT_KEY);
    const userId = decodedToken.id;

    const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'email'] });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    req.user = { id: user.id, email: user.email };

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server error',
    });
  }
};

export default middleware;
