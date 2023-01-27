const express = require("express");
const {createImageContoller, commitImageController, deleteRecentCommitController, deleteMemberController, addMemberController, getImageController} = require("../controllers/imageController")

const router = express.Router();

router.route('/:id').get(getImageController)
router.route('/create').post(createImageContoller)
router.route('/commit/:id').post(commitImageController)
router.route('/delete/:id').delete(deleteRecentCommitController)
router.route('/member/:id').post(addMemberController)
router.route('/delete/:id/:memberName').delete(deleteMemberController)

module.exports = router;