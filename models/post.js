import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'userId',
      });

      this.hasMany(models.Comment, {
        targetKey: 'id',
        foreignKey: 'postId',
      });
    }
  }
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
  return Post;
};
