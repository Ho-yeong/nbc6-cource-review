import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Comment extends Model {}

Comment.init(
  {
    content: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Comment',
  },
);

export default Comment;
