const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
  //__dirname : It will resolve to your project folder.
});
app.use(express.static("dist"));
//add the router
app.use("/", router);
app.listen(process.env.port || 4000);

console.log(`Running at Port ${process.env.port || 4000}`);
