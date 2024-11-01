const router = require("express").Router()
const getAddress = require("../api/geo-api")
router.get("/",(req,res)=>{
    
})

router.get("/reverseGeoCoder",async(req,res)=>{
    const {lat,lon} = req.query
    console.log(req.query,lat,lon)
    const address=await getAddress(lat,lon)
    res.status(200).send({address})
})

module.exports=router