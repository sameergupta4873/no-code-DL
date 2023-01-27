const express = require("express");
const { getUserProfile, registerUser, getUserbySearch, addUsersProject, listImageProjects} = require("../controllers/userController")

const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/find').get(getUserbySearch);
router.route('/projects/:id').post(addUsersProject);
router.route('/imagelist/:id').get(listImageProjects);

module.exports = router;