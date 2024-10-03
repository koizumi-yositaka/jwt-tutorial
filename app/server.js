const express = require("express")
const cookieParser = require('cookie-parser');

const authRouter = require("./routes/auth-router")


const app= express()
app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRouter)

const PORT = 5002

app.get("/",(req,res)=>{
    res.send({aa:process.env.REFRESH_TOKEN_DURATION_MINUTE})
})

app.listen(PORT,()=>{
    console.log("server run　２")
})