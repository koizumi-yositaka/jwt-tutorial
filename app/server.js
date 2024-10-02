const express = require("express")
const app= express()
app.use(express.json())
const PORT = 5002

app.get("/",(req,res)=>{
    res.send({aa:"sdfs AAAA"})
})

app.listen(PORT,()=>{
    console.log("server run")
})