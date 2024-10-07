const {verify,makeAccessToken} = require("../util/jwt")
const {isExistEmail} =require("../db_access/user")



const checkToken=async(req,res,next)=>{
    const token=req.cookies.accessToken
    const refreshtoken=req.cookies.refreshToken
    console.log("checkTOken",token,refreshtoken)
    if(!token && !refreshtoken){
        return res.status(400).json([
            {
                message:"tokenがない"
            }
        ])
    }

    try{
        const decoded = await verify(token)
        next()
        return
        
    }catch (err) {
        if(!refreshtoken){
            return res.status(400).json([
                {
                    message:"rtokenがない"
                }
            ])
        }
    
        try{
            console.log("refresh")
            const {email} = await verify(refreshtoken)
            console.log("email",email)
            const isExist= await isExistEmail(email)
            if(isExist){
                
                const newToken = await makeAccessToken({email})
                res.cookie("accessToken",newToken,{
                    httpOnly:true,
                    maxAge: 24 * 60 * 60 * 1000, // 1日 (ミリ秒単位)
                    secure:false,
                    sameSite:"none"
                })
                next()
                return
            }else{
                return res.status(400).json([
                    {
                        message:"ユーザがいない"
                    }
                ])
            }
                
            


        }catch(err){
            console.log(err)
            return res.status(400).json([
                {
                    message:"トークンの生成の失敗お"
                }
            ])
        }
    }

}

module.exports=checkToken


// const checkToken=async(req,res,next)=>{
//     const token=req.cookies.accessToken
//     console.log("tokeb",token)
//     const decoded=await verify(token)
//     console.log("decoded",decoded)
//     const isExist =await isExistEmail(decoded.email)
//     if(isExist){
//         console.log("OK")
//         next()
//     }else{
//         return res.status(400).json([
//             {
//                 message:"認証エラー"
//             }
//         ])
//     }
// }