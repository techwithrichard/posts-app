// refresh token
const jwt = require('jsonwebtoken');

const refreshToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};


module.exports = refreshToken;