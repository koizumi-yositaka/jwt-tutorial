const JWT = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET
const jwtOptions = {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_DURATION_MINUTE + 'm'
}
const refreshJwtOptions = {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_DURATION_MINUTE + 'm'
}

const makeAccessToken=async (target)=>{
    console.log("target",jwtSecret,jwtOptions)
    const token = await JWT.sign(
        target,
        jwtSecret,
        jwtOptions
    )
    return token
}

const makeRefreshToekn=async(target)=>{
    console.log("target",jwtSecret,refreshJwtOptions)
    const token = await JWT.sign(
        target,
        jwtSecret,
        refreshJwtOptions
    )
    return token
}

const verify= async (token) =>{
    const decoded = await JWT.verify(token,jwtSecret)
    return decoded
}


module.exports={
    makeAccessToken,
    makeRefreshToekn,
    verify
}