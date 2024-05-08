const mongoose = require('mongoose');


const conversationModel = new mongoose.Schema({
participants : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User'
}]

},

{timestamps : true})


module.exports = mongoose.model('Conversation' , conversationModel)
