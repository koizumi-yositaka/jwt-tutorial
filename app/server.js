const express = require("express")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const checkToken = require("./middleware/check_jwt")
const userRouter = require("./routes/user-router")
const hogeRouter = require("./routes/hoge-router")


const app= express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:`http://localhost:${process.env.REACT_PORT}`,
    credentials:true
}))
app.use("/users",userRouter)
app.use("/hoge",hogeRouter)

const PORT = 5002

app.get("/",(req,res)=>{
    res.send({aa:process.env.REACT_PORT})
})

app.get("/health",checkToken,(req,res)=>{
    res.status(200).send({"state":"ok"})
})  

app.listen(PORT,()=>{
    console.log("server run　２")
})