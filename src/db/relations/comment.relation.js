import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';

export default () => {
  Comment.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
  });

  Comment.belongsTo(Post, {
    targetKey: 'id',
    foreignKey: 'postId',
  });
};
