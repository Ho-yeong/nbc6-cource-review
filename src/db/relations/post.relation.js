import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';

export default () => {
  Post.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
  });

  Post.hasMany(Comment, {
    targetKey: 'id',
    foreignKey: 'postId',
  });
};
