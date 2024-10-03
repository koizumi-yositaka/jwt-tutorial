const {makeAccessToken,makeRefreshToekn,verify} = require("../util/jwt")
const {getUserByEmail} = require("../db_access/user")

const setToken=async(req,res,next)=>{
    // const token=req.header("x-auth-token")
    const token=req.cookies.accessToken
    const refreshtoken=req.cookies.refreshToken
    if(!token && !refreshtoken){
        return res.status(400).json([
            {
                message:"tokenがない"
            }
        ])
    }
    try{
        const decoded = await verify(token)
        
        // req.header["x-auth-token"]=token
        next()
    }catch (err) {
        if(!refreshtoken){
            return res.status(400).json([
                {
                    message:"リフレッシュトークンがない"
                }
            ])
        }
    
        try{
            let {email} = await verify(refreshtoken)
            const newToken=await makeAccessToken({email})
            console.log("リフレッシュの使用")
            res.cookie("accessToken",newToken,{
                httpOnly:true
            })
            next();

        }catch(err){
            console.log("erro",err)
            return res.status(400).json([
                {
                    message:"アクセストークンの生成失敗"
                }
            ])
        }
    }
}

const checkToken=async(req,res,next)=>{
    const token=req.cookies.accessToken
    console.log("tokeb",token)
    const decoded=await verify(token)
    console.log("decoded",decoded)
    const users =await getUserByEmail(decoded.email)
    if(users && users.length >0){
        console.log("OK")
        next()
    }else{
        return res.status(400).json([
            {
                message:"認証エラー"
            }
        ])
    }
}

module.exports={setToken,checkToken}