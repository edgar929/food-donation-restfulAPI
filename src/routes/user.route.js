import express from 'express';
import userController from "../controller/userController";
import auth from "../middleware/auth";

const router = express.Router();


router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/update-profile', auth, userController.updateProfilePicture);

module.exports = router;
