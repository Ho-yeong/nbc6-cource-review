import sequelize from './sequelize';
import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';
import Like from './models/like';

import relations from './relations';

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export { sequelize, User, Post, Comment, Like };
