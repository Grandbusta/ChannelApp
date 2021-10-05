'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Channel,message,UserChannel}) {
      this.belongsToMany(Channel, {
        through: UserChannel,
      })
      this.hasMany(message)
    }
  }
  User.init(
    {
      username: {type: DataTypes.STRING, unique: true},
      email: {type: DataTypes.STRING, unique: true},
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
