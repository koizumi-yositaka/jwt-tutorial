const express = require("express")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const authRouter = require("./routes/auth-router")


const app= express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:`http://localhost:${process.env.REACT_PORT}`,
    credentials:true
}))
app.use("/users",authRouter)

const PORT = 5002

app.get("/",(req,res)=>{
    res.send({aa:process.env.REACT_PORT})
})

app.listen(PORT,()=>{
    console.log("server run　２")
})