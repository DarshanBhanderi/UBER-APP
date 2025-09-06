const express =require('express');
const router=express.Router();
const {body}=require("express-validator");
//const userController =require('../controllers/user.controllers');
const userController = require('../controllers/user.controllers'); // correct path




router.post('/ragister',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage
    ('frist name mustbe at least 3 characters long'),
    body('password').isLength({min:6}).withMessage
    ('password  mustbe at least 6 characters long'),
],
userController.ragisterUser);


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage
    ('password mustbe at least 6 characters long'),
],
userController.loginUser
)
module.exports = router;



