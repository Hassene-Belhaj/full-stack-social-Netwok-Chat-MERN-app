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
  const createdUser = await userModel.create({
    name,
    username,
    email,
    password: cryptedPassword,
  });

  generateTokenAndSetCookie(createdUser._id,createdUser.username,createdUser.profilePic, res);

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
  generateTokenAndSetCookie(resp._id,resp.username,resp.profilePic, res);
  const { password, ...info } = resp._doc;
  res.status(200).json({ success: true, msg: "sign in successfully", info });
});

const logOut = Asyncwrapper(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ success: true, msg: "log out successfully" });
});

const follow_unfollow = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;
  const existUser = await userModel.findById(id)
  if(!existUser) return next(createCustomError('user not found' , 404))
  const currentUser = await userModel.findById(userID);
  if (id === userID)
    return next(createCustomError("you cannot follow your self", 400));
  const isfollowing = currentUser.following.includes(id);
  if (!isfollowing) {
    const following = await userModel.findByIdAndUpdate(
      userID,
      {
        $push: { following: id },
      },
      { new: true }
    );
    const follow = await userModel.findByIdAndUpdate(
      id,
      {
        $push: { followers: userID },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "unfollowing successfully",
      following,
      follow,
    });
  } else {
    const unfollowing = await userModel.findByIdAndUpdate(
      userID,
      {
        $pull: { following: id },
      },
      { new: true }
    );
    const unfollow = await userModel.findByIdAndUpdate(
      id,
      {
        $pull: { followers: userID },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "following successfully",
      unfollowing,
      unfollow,
    });
  }
});

const updateUser = Asyncwrapper(async (req, res, next) => {
  const userID = req.user.id;
  const pwd = req.body.password
  const { name, username, email, profilePic, bio } = req.body;

  if (req.params.id !== userID)
    return next(createCustomError("you can not update other profile", 400));
  const user = await userModel.findById(userID);
  if (!user) return next(createCustomError("user not found", 400));
  if (pwd) {
    const salt = bcrypt.genSaltSync(10);
    const newPwd = bcrypt.hashSync(pwd, salt);
    user.password = newPwd;
  }
  user.name = name || user.name;
  user.username = username || user.username;
  user.email = email || user.email;
  user.profilePic = profilePic || user.profilePic;
  user.bio = bio || user.bio;
  const userUpdateInfo = await user.save();
  const  {password ,__v,  ...rest} = userUpdateInfo._doc
  res.status(200).json({ success: true, rest });
});

const getProfile = Asyncwrapper(async (req, res, next) => {
  const { username } = req.params;
  const finduser = await userModel
    .findOne({ username })
    .select("-password -updatedAt -__v");
  if (!finduser)
    return next(createCustomError("sorry no user with this username", 400));
  res.status(200).json({ success: true, finduser });
});

module.exports = {
  signUp,
  signIn,
  logOut,
  follow_unfollow,
  updateUser,
  getProfile,
};
