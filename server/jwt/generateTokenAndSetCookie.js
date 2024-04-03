const jwt = require('jsonwebtoken');



const generateTokenAndSetCookie = (id,username,profilePic,res) => {
 const  token =  jwt.sign({id , username , profilePic} , process.env.SECRETJWT ,{
     expiresIn : '15d'
  })

  res.cookie("token" , token , {
    httpOnly : true , 
    maxAge : 24 * 60 * 60 * 1000 * 15 ,
    sameSite : "strict"
})
return token
}


module.exports = {
    generateTokenAndSetCookie
};
