const router = require("express").Router()
const {createUser,isExistEmail,getUserByEmail} = require("../db_access/user")
const {makeAccessToken,makeRefreshToekn} = require("../util/jwt")

// router.get("/",[setToken,checkToken],(req,res)=>{
//     res.send({"title":"auth"})
// })
router.get("/",async (req,res)=>{
    const {email} = req.query
    console.log("eeeeee",email)
    const isExist = await isExistEmail(email)
    res.send({"isExist":isExist})
})

router.post("/singup",async (req,res)=>{
    const {email,password} = req.body
    await createUser(email,password)
    //jwt発行
    const token = await makeAccessToken({email})
    //Refresh Token発行
    const refreshtoken = await makeRefreshToekn({email})

    res.cookie("accessToken",token,{
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000, // 1日 (ミリ秒単位)
    })
    res.cookie("refreshToken",refreshtoken,{
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000, // 1日 (ミリ秒単位)
    })
    // var users = await getAllUsers()
    // console.log("users",users)
    res.status(201).send({"title":"success"})
})

router.post("/logout",(req,res)=>{
    res.clearCookie("accessToken",
        {
            httpOnly:true
        }
    )
    res.clearCookie("refreshToken",
        {
            httpOnly:true
        }
    )
    res.status(200).send({message:"success"})
})

router.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body
        console.log("pass",password)
        const result = await getUserByEmail(email)
        console.log("result",result)
        if(result && result.length===0){
            res.status(404).json([
                {
                    res:false,
                    message:"Not Found"
                }
            ])
        }else {
            const user = result[0]
            if(user.password === password){
                const token = await makeAccessToken({email})
                //Refresh Token発行
                const refreshtoken = await makeRefreshToekn({email})
                console.log(refreshtoken)
                res.cookie("accessToken",token,{
                    httpOnly:true,
                    maxAge: 24 * 60 * 60 * 1000, // 1日 (ミリ秒単位)
                })
                res.cookie("refreshToken",refreshtoken,{
                    httpOnly:true,
                    maxAge: 24 * 60 * 60 * 1000, // 1日 (ミリ秒単位)
                })
                console.log("here")
                res.status(200).send({loginResult:true,message:"success"})
            }else{
                res.status(401).send(
                    {
                        loginResult:false,
                        message:"Wrong Password!"
                    }
                )
            }
            
        }
    }catch(ex){
        console.error(ex)
    }


    


})

module.exports=router