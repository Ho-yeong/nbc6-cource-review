'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {}
  like.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'like',
    },
  );
  return like;
};
