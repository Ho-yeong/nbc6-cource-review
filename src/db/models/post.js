import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Post',
  },
);

export default Post;
