'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserChannel extends Model {
    static associate({User, message}) {}
  }
  UserChannel.init(
    {},
    {
      sequelize,
      modelName: 'UserChannel',
    },
  )
  return UserChannel
}
