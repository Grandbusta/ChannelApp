const express = require('express')
const router = express.Router()

const {getChannels,createChannel,joinChannel,getOneChannel} = require('../controllers/channel')
const {userAuth}=require('../middlewares/auth')

router.get('/getChannels',userAuth, getChannels)
router.post('/createChannel', userAuth, createChannel)
router.post('/joinChannel/:channelId', userAuth, joinChannel)
router.get('/getChannels/:channelId',userAuth,getOneChannel)

module.exports = router
