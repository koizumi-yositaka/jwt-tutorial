const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.EXPRESS_PORT || 3000;
mongoose
  .connect(process.env.DB_CONN)
  .then(() => console.log("DB_CONNECT_SUCCESS"))
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log("server run ver2", process.env.REACT_PORT);
});