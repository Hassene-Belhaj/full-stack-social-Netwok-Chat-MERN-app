const express = require('express');
const router = express.Router()
const { VerifyToken } = require('../token/verifyToken');
const { sendMessage , getMessage , getConversation} = require('../Controllers/chat');





router.route('/messages').post(VerifyToken,sendMessage)
router.route('/conversations').get(VerifyToken,getConversation)
router.route('/:otheruserid').get(VerifyToken,getMessage)



module.exports = router ;
