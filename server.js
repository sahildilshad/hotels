const express = require("express");
const db = require("./db");
const app = express(); 
app.use(express.json());
const personRoutes = require("./routes/personRoutes")

app.use('/person',personRoutes)

const menuRoutes = require("./routes/menuRoutes")

app.use("/menu",menuRoutes)

const bodyparser = require("body-parser");
app.use(bodyparser.json());




app.get("/person", (req, res) => {
  res.send("welcome the backend world...");
});








app.listen(3000, () => {
  console.log(`Running on the port 3000`);
});
