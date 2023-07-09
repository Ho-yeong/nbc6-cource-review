import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../constants';
import { User } from '../db';

export class UserService {
  signup = async (email, password) => {
    try {
      await User.create({
        email,
        password,
      });

      return {
        message: 'signup success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  login = async (email, password) => {
    try {
      if (!email || !password) {
        return {
          message: 'check email or password',
        };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return {
          message: 'user not found',
        };
      }
      if (user.password !== password) {
        return {
          message: 'check email or password',
        };
      }

      const token = await jwt.sign({ id: user.id, email: user.email }, JWT_KEY);

      return { token };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}
