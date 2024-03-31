const jwt = require('jsonwebtoken');



const generateTokenAndSetCookie = (user,res) => {
 const  token =  jwt.sign({id : user} , process.env.SECRETJWT ,{
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
