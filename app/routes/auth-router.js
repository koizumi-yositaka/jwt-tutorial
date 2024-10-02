const router = require("express").Router()

router.get("/",(req,res)=>{
    res.send({"title":"auth"})
})


module.exports=router