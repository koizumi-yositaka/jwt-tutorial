
const UserModel = require("../models/User");
const getAllUsers=async ()=>{
    const users=await UserModel.find({})
    try{
        console.log("users",users)
    }catch(err){
        console.log(err)
    }
   

}
const isExistEmail = async(email)=>{
    const rows = await getUserByEmail(email)
    return rows.length > 0
}
const getUserByEmail=async (email)=>{
    const users = await UserModel.find({email})
    try{
        console.log("user",users)
        return users
    }catch(err){
        console.log(err)
    }
}
const createUser=async (name,pass)=>{
    const user = new UserModel({email:name,password:pass})
    try{
        await user.save()
    }catch(err){
        console.log(err)
    }
}

module.exports={getAllUsers,createUser,getUserByEmail,isExistEmail}