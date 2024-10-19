const mongoose = require("mongoose")
const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
    
})

const UserModel = mongoose.model("User",UserSchema)

module.exports=UserModel