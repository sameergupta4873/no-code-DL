const express = require("express");
const { getUserProfile, registerUser} = require("../controllers/userController")

const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

router.route('/').post(registerUser)
router.route('/profile').get(protect, getUserProfile)

module.exports = router;