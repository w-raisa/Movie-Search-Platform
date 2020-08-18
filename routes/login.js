const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.post("/", (req, res, next) => {
  // here do authentication, make sure password and username are correct.
  const username = req.body.email
  const password = req.body.password
  console.log("username: " + username)

  User.findOne({email: req.body.email}, (err, user) => {
    console.log("user: " + user)
    if (err)
      return next(err)
    if (user != null) { // this is the case where a user exists in db.
      if (user.password != password) {
        const message = {Items: "Incorrect Password."}
        console.log("incorrect pw")
        res.render("home", message)
      }
      else {
        res.redirect("/account") // successful login
      }
    }
    else {
      const message = {Items: "User does not exist, please create an account."}
      console.log("user dne")
      res.render("home", message)
    }
  })
})

module.exports = router
