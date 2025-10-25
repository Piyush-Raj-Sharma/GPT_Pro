const jwt = require('jsonwebtoken');

function generateTokens(user){
    console.log("coming here");
    
    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_SECRET, {
        expiresIn:  "7d"
    })

    return {accessToken, refreshToken};
}

module.exports = generateTokens;