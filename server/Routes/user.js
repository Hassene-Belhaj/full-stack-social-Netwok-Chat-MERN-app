const express = require('express');
const { signUp, signIn, logOut , follow, updateUser } = require('../Controllers/user');
const { VerifyToken } = require('../token/verifyToken');
const router = express.Router()

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/logout').post(logOut)
router.route('/follow/:id').post(VerifyToken, follow)
router.route('/update/:id').post(VerifyToken, updateUser)



module.exports = router
