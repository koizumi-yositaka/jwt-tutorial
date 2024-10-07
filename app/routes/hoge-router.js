const checkToken= require("../middleware/check_jwt")


const router = require("express").Router()

router.get("",[checkToken],(req,res)=>[
    res.status(200).send("dfdfdfdd")
])

module.exports=router