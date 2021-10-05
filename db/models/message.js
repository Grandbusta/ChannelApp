'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    static associate({User, Channel}) {}
  }
  message.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'message',
    },
  )
  return message
}
