const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const checkToken = require("./middleware/check_jwt");
const userRouter = require("./routes/user-router");
const hogeRouter = require("./routes/hoge-router");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `http://localhost:${process.env.REACT_PORT}`,
    credentials: true,
  })
);

mongoose
  .connect(process.env.DB_CONN)
  .then(() => console.log("DB_CONNECT_SUCCESS"))
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/hoge", hogeRouter);

app.get("/api", (req, res) => {
    try{
        res.send({ aa: process.env.REACT_PORT });
    }catch(err){
        errorHandler(res, error)
    }
  
});

app.get("/api/health", checkToken, (req, res) => {
    try{
        res.status(200).send({ state: "OK" });
    }catch(err){
        errorHandler(res, error)
    }
  
});
const errorHandler = (res, error) => {
    if (error.response) {
        res.status(500).send({ error: error.response })
        // } else if (error.request) {
        // res.status(500).send({ error: error.message })
    } else {
        res.status(500).send({ error: error.message })
    }
}

module.exports = app;