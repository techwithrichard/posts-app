const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({
            status: 'fail',
            message: 'No token, authorization denied'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                status: 'fail',
                message: 'Token is not valid'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Token is not valid'
        })
    }
};

module.exports = protect;
