import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Like extends Model {}
Like.init(
  {
    userId: DataTypes.INTEGER,
    contentId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Like',
  },
);

export default Like;
