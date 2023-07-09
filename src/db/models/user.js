import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class User extends Model {}

User.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User;
