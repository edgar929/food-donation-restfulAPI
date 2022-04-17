import express from 'express';
import userController from "../controller/userController"

const router = express.Router();


router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
