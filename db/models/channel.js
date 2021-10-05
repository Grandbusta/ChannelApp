'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    static associate({User,message,UserChannel}) {
      this.belongsToMany(User, {
        through: UserChannel,
      })
      this.hasMany(message)
      this.belongsTo(User, {foreignKey: 'authorId'})
    }
  }
  Channel.init(
    {
      name: {type: DataTypes.STRING, allowNull: false},
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Channel',
    },
  )
  return Channel
}
