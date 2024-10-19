const express = require("express")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const checkToken = require("./middleware/check_jwt")
const userRouter = require("./routes/user-router")
const hogeRouter = require("./routes/hoge-router");
const mongoose= require("mongoose");


const app= express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:`http://localhost:${process.env.REACT_PORT}`,
    credentials:true
}))

mongoose.connect(process.env.DB_CONN).then(()=>console.log("DB_CONNECT_SUCCESS")).catch((err)=>console.log(err))




app.use("/api/users",userRouter)
app.use("/api/hoge",hogeRouter)

const PORT = process.env.EXPRESS_PORT
console.log("PORT",PORT

)

app.get("/api",(req,res)=>{
    res.send({aa:process.env.REACT_PORT})
})

app.get("/api/health",checkToken,(req,res)=>{
    res.status(200).send({"state":"OK"})
})  

app.listen(PORT,()=>{
    console.log("server run",process.env.REACT_PORT)
})


