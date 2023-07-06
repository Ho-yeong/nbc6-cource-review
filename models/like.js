'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  return Like;
};
