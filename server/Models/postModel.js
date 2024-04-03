const mongoose = require('mongoose');


const postModel = new mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true ,
    } ,
    text : {
        type : String , 
        maxLength : 500 ,
    } ,
    image : {
        type : String ,

    } ,
    likes : [ 
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'User'
        }
    ],

    replies : [
        {
            userID : {
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'User',
                required : true ,
            },
            text : {
                type : String ,
                required : true,

            },
            userProfilePic : {
              type : String ,
            },
            username : {
               type : String ,
            }

        }
    ]
        

},{
    timestamps : true
})


module.exports = mongoose.model('Post' , postModel)