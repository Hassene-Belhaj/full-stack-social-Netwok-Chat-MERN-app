const router = require('express').Router();
const { newPost  , getPost , deletePost , like_Unlike , replyPost , getFeedPost} = require('../Controllers/post');
const { VerifyToken } = require('../token/verifyToken');


router.route('/new').post(VerifyToken,newPost)
router.route('/:id').get(getPost)
router.route('/:id').delete(VerifyToken,deletePost)
router.route('/post/like/:id').post(VerifyToken,like_Unlike)
router.route('/post/reply/:id').post(VerifyToken,replyPost)
router.route('/post/feed').get(VerifyToken,getFeedPost)










module.exports = router ;