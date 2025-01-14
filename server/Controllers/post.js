const { Asyncwrapper } = require("../Middlewares/AsyncWrapper");
const { createCustomError } = require("../Middlewares/ErrorHandler");
const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");
const cloudinary = require("cloudinary").v2;

const newPost = Asyncwrapper(async (req, res, next) => {
  const userID = req.user.id;
  const { postedBy, text } = req.body;
  let { image } = req.body;
  if (!postedBy || !text) return next(createCustomError("please fill all required fields", 400));
  // if(!image) return next(createCustomError('please upload Image',400))
  const user = await userModel.findById(postedBy);
  if (String(user._id) !== userID) return next(createCustomError("unauthorized", 401));
  const maxLength = 500;
  if (text.length > maxLength) return next(createCustomError(`text should be less than ${maxLength}`, 400));

  if (image) {
    const respUpload = await cloudinary.uploader.upload(image);
    image = respUpload.secure_url;
  }

  const newPost = await postModel.create({
    postedBy,
    text,
    image,
  });

  res.status(200).json({ success: true, msg: "post created successfully", newPost });
});

const getPost = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const resp = await postModel.findById(id).populate("postedBy", "-password -bio -followers -following  -createdAt -updatedAt -__v");
  if (!resp) return next(createCustomError("post not found", 404));
  if (!id) return next(createCustomError("post not found", 404));
  res.status(200).json({ success: true, resp });
});

const deletePost = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;
  const resp = await postModel.findById(id);
  if (!resp) return next(createCustomError("post not found", 404));
  if (userID !== String(resp.postedBy._id)) return next(createCustomError("unauthorized to delete this Post", 401));
  if (resp.image) {
    await cloudinary.uploader.destroy(resp.image.split("/").pop().split(".")[0]);
  }
  await postModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, msg: "posts deleted successfully" });
});

const like_Unlike = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const userID = req.user.id;
  const resp = await postModel.findById(id);
  if (!resp) return next(createCustomError("post not found", 404));
  const isAlreadyliked = resp.likes.includes(userID);
  if (isAlreadyliked) {
    const resp = await postModel
      .findByIdAndUpdate(
        id,
        {
          $pull: { likes: userID },
        },
        { new: true }
      )
      .populate("likes", "-password -profilePic -followers -following -bio -createdAt -updatedAt -__v");
    return res.status(200).json({ success: true, msg: "unliked", resp });
  } else {
    const resp = await postModel
      .findByIdAndUpdate(
        id,
        {
          $push: { likes: userID },
        },
        { new: true }
      )
      .populate("likes", "-password -profilePic -followers -following -bio -createdAt -updatedAt -__v");
    return res.status(200).json({ success: true, msg: "liked", resp });
  }
});

const replyPost = Asyncwrapper(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const userID = req.user.id;
  const userProfilePic = req.user.profilePic;
  const { username } = req.user;
  if (!text) return next(createCustomError("text field is required", 400));
  const postFind = await postModel.findById(id);
  if (!postFind) return next(createCustomError("post not found", 404));
  const reply = { text, userID, userProfilePic, username };
  postFind.replies.push(reply);
  await postFind.save();
  res.status(200).json({ success: true, msg: "replied successfully", postFind });
});

const getYourReplies = Asyncwrapper(async (req, res, next) => {
  const { username } = req.body;
  const findUser = await userModel.findOne({ username });
  if (!findUser) return next(createCustomError("user not found", 404));
  const resp = await postModel.find({ "replies.username": username }).populate("postedBy", "-password").sort({ updatedAt: -1 });
  res.status(200).json({ success: true, nbr: resp?.length, resp });
});

const getFeedPost = Asyncwrapper(async (req, res, next) => {
  const userID = req.user.id;
  const checkuser = await userModel.findById(userID);
  if (!checkuser) return next(createCustomError("user not found", 404));
  const followedUser = checkuser.following;
  const posts = await postModel
    .find({ postedBy: { $in: followedUser } })
    .sort({ createdAt: -1 })
    .populate("postedBy", "-updatedAt -__v -email -name  -password");
  res.status(200).json({ success: true, nbr: posts?.length, posts });
});

const getallPostsUser = Asyncwrapper(async (req, res, next) => {
  const { username } = req.params;
  const findUser = await userModel.findOne({ username });
  if (!findUser) return next(createCustomError("user does not exist", 404));
  const resp = await postModel.find({}).populate("postedBy", "-password -__v -updatedAt");
  if (!resp) return next(createCustomError("post not found", 404));
  const result = resp.filter((item) => item.postedBy.username === username);
  if (!result) return next(createCustomError("post not found", 404));
  result.sort((a, b) => b.createdAt - a.createdAt);
  res.status(200).json({ success: true, nbr: result.length, result });
});

module.exports = {
  newPost,
  getPost,
  deletePost,
  like_Unlike,
  replyPost,
  getFeedPost,
  getallPostsUser,
  getYourReplies,
};
