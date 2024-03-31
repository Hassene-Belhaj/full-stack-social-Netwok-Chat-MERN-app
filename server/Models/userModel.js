const mongoose = require('mongoose');


const userModel = new mongoose.Schema({
 name : {
    type : String ,
    required : true
 },
 username : {
    type : String ,
    required : true,
    unique : true
 },
 email : {
    type : String ,
    required : true ,
    unique : true
 },
 password : {
    type : String ,
    required: true
 },
 profilePic : {
    type : String ,
    default  :  ""
 },
 followers : {
  type : [String],
  default : []
 },
 following : {
    type : [String],
    default : []
 },
 bio : {
    type : String ,
    default : "" ,
 }
    

},{timestamps : true})


module.exports = mongoose.model('User',userModel)


