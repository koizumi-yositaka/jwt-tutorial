const router = require("express").Router()
const {createUser,getAllUsers,getUserByEmail} = require("../db_access/user")
const {checkToken,setToken} = require("../middleware/check_jwt")
const {makeAccessToken,makeRefreshToekn} = require("../util/jwt")

router.get("/",[setToken,checkToken],(req,res)=>{
    res.send({"title":"auth"})
})
router.post("/",async (req,res)=>{

    // await createUser("FFF","CCC")
    // //jwt発行
    // const token = await makeAccessToken({email:"EEE"})
    // //Refresh Token発行
    // const refreshtoken = await makeRefreshToekn({email:"EEE"})
    // // var users = await getAllUsers()
    // // console.log("users",users)
    // res.send({"title":"success","token":token,"rt":refreshtoken})
})

router.post("/login",async (req,res)=>{

    const {email,password} = req.body

    const result = await getUserByEmail(email)
    if(result && result.length===0){
        return res.status(404).json([
            {
                message:"Not Found"
            }
        ])
    }else {
        const user = result[0]
        if(user.password === password){
            const token = await makeAccessToken({email})
            //Refresh Token発行
            const refreshtoken = await makeRefreshToekn({email})
            res.cookie("accessToken",token,{
                httpOnly:true
            })
            res.cookie("refreshToken",refreshtoken,{
                httpOnly:true
            })
            res.send({"title":"success!"})
        }else{
            return res.status(400).json([
            {
                message:"Wrong Password"
            }
        ])
        }
        
    }

    


})

module.exports=router