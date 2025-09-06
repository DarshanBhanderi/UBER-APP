const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // added for password hashing

module.exports.ragisterUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    const { fullname, email, password } = req.body;

    // Fixed: use bcrypt to hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedpassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

}
