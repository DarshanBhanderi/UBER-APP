const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Remove the blacklist token check since the model doesn't exist
        // const isBlacklisted = await blackListTokenModel.findOne({ token: token });
        // if (isBlacklisted) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}