const db = require('../db/models')

exports.getChannels = async (req, res, next) => {
  const Channels = await db.Channel.findAll({attributes: {exclude: ['authorId','updatedAt']}})
  res.status(200).json({status: 'OK', response: Channels})
}

exports.createChannel = async (req, res, next) => {
  const {name, description} = req.body
  if (!(name && description)) {
    return res
      .status(200)
      .json({status: 'Error', response: 'Invalid request body'})
  }
  const newChannel = await db.Channel.create({
    name: name,
    description: description,
    authorId: req.userData.id,
  })
  res.status(200).json({status: 'OK', response: newChannel})
}

exports.joinChannel=async(req,res,next)=>{
  try {
    const check = await db.UserChannel.findOne({
      where: {ChannelId: req.params.channelId, UserId: req.userData.id},
    })
    if(check){
     return res.status(200).json({status: 'OK', response: 'Joined successfully'})
    }
    await db.UserChannel.create({
      ChannelId: req.params.channelId,
      UserId: req.userData.id,
    })
    res.status(200).json({status: 'OK', response: 'Joined successfully'})
  } catch (error) {
    console.error(error)
    res.status(500).json({status: 'Error', response: 'An error occured'})
  }
}

exports.getOneChannel=async(req,res,next)=>{
  try {
    const channel = await db.Channel.findOne({
      where: {id: req.params.channelId},
      attributes: {exclude: ['authorId', 'updatedAt']},
      include: [{model: db.message}],
    })
    res.status(200).json({status: 'OK', response: channel})
  } catch (error) {
    console.error(error)
    res.status(500).json({status: 'Error', response: 'An error occured'})
  }
}