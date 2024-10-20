const app = require("./app");

const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => {
  console.log("server run ver2", process.env.REACT_PORT);
});