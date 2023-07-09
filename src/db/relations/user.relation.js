import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';

export default () => {
  User.hasMany(Post, {
    sourceKey: 'id',
    foreignKey: 'userId',
  });

  User.hasMany(Comment, {
    sourceKey: 'id',
    foreignKey: 'userId',
  });
};
