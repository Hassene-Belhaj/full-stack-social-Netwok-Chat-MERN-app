const { Asyncwrapper } = require("../Middlewares/AsyncWrapper");
const { createCustomError } = require("../Middlewares/ErrorHandler");
const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const {
  generateTokenAndSetCookie,
} = require("../jwt/generateTokenAndSetCookie");

const signUp = Asyncwrapper(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const resp = await userModel.findOne({ $or: [{ email }, { username }] });

  if (resp) return next(createCustomError("user already exists", 400));

  const salt = bcrypt.genSaltSync(10);
  const cryptedPassword = bcrypt.hashSync(password, salt);
  const createUser = await userModel.create({
    name,
    username,
    email,
    password: cryptedPassword,
  });

  generateTokenAndSetCookie(createUser._id, res);

  res.status(201).json({ success: true, msg: "user created successfully" });
});

const signIn = Asyncwrapper(async (req, res, next) => {
  const { username } = req.body;
  if (!username || !req.body.password)
    return next(createCustomError(" please fill all fields", 400));
  const resp = await userModel.findOne({ username });
  if (!resp) return next(createCustomError("user does not exist", 403));
  const isValidPawd = await bcrypt.compare(req.body.password, resp.password);
  if (!isValidPawd) return next(createCustomError("invalid credentials", 403));
  generateTokenAndSetCookie(resp._id, res);
  const { password, ...rest } = resp._doc;
  res.status(200).json({ success: true, msg: "sign in successfully", rest });
});

const logOut = Asyncwrapper(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ success: true, msg: "log out successfully" });
});

const follow = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;
  const user = await userModel.findById(id);
  const currentUser = await userModel.findById(userID);
  if (id === userID)
    return next(createCustomError("you cannot follow your self", 400));
  const isfollowing = currentUser.following.includes(id);
  if (!isfollowing) {
    const following = await userModel.findByIdAndUpdate(userID, {
      $push: { following: id },
    });
    const follow = await userModel.findByIdAndUpdate(id, {
      $push: { followers: userID },
    });
    return res
      .status(200)
      .json({
        success: true,
        msg: "unfollowing successfully",
        following,
        follow,
      });
  } else {
    const unfollowing = await userModel.findByIdAndUpdate(userID, {
      $pull: { following: id },
    });
    const unfollow = await userModel.findByIdAndUpdate(id, {
      $pull: { followers: userID },
    });
    return res
      .status(200)
      .json({
        success: true,
        msg: "following successfully",
        unfollowing,
        unfollow,
      });
  }
});

const updateUser = Asyncwrapper(async (req, res, next) => {
  const { name, username, email,password , profilePic, bio } = req.body;
  const userID = req.user.id;
  if(req.params.id !== userID) return next(createCustomError('you can not update other profile',400))
  const resp = await userModel.findById(userID);
  if (!resp) return next(createCustomError("user not found", 400));
   if(password) {
    const salt = bcrypt.genSaltSync(10);
    const newPwd =  bcrypt.hashSync(password, salt);
    const updateUser = await userModel.findByIdAndUpdate(userID, {
        password: newPwd,
      },{new : true});
      res.status(202).json({success : true , msg : 'password updated successfully ',  updateUser})
   } else {
       const updateUser = await userModel.findByIdAndUpdate(userID, {
       name : name ? name : resp.name ,
       username : username ? username : resp.username ,
       email : email ? email : resp.email ,
       profilePic : profilePic ? profilePic : resp.profilePic ,
       bio : bio ? bio : resp.bio
     },{new : true});
     res.status(200).json({success : true , updateUser})
   }

});

module.exports = {
  signUp,
  signIn,
  logOut,
  follow,
  updateUser,
};
