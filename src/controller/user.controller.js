import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service';

export class UserController {
  _userService = new UserService();

  signup = (req, res) => {
    const { email, password } = req.body;

    this._userService
      .signup(email, password)
      .then((body) => {
        // To send response
        res.status(200).json({
          success: true,
          body,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  login = (req, res) => {
    const { email, password } = req.body;

    this._userService
      .login(email, password)
      .then((body) => {
        // To send response
        res.status(200).json({
          success: true,
          body,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };
}
