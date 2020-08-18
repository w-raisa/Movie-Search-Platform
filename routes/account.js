const express = require("express")
const router = express.Router()

router.get("/", (req,res,next) => {
  //res.send("successful register")
  res.render("index")
})

module.exports = router
