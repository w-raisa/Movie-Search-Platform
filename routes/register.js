// this file handles the information being written in the textfields of the form (the signup form). this information needs to get sent somewhere. This file handles that. This file send the data from the forms into the mongo db
const express = require("express")
const router = express.Router()
const User = require("../models/User") // importing the User object model/schema into here. we need this to create our new user in our bd

//router.post("/", passport.authenticate("localRegister", {
router.post("/", (req, res, next) => {
  //successRedirect: "/account"
  // here make sure to add new user to the database THEN redirect them to their account page.
  const email = req.body.email
  const password = req.body.password
  User.findOne({email: email}, (err, user) => {
    if (err)
      return next(err)
    if (user != null){ // this is the case where someone registers a new user and that user already existed.
      //return
      const message = {exists: "Username taken. Try another username."}
      res.render("home", message)
    }
    else {
      //create the new user, here we want to make sure the password gets hashed before the user is even entered into the database, because putting in the password as is is not best practice. since we create a new user here, we need to hash the password here, we enter the user into the db here.
      //const hashedPw = bcryptjs.hashSync(password, 10) // npm install bcryptjs --save. this library hashes passwords. the highest the number in the second argument is, the harder it is to crack the password

      User.create({email:email, password: password}, (err, user) => { // creating a new user with the email and the password passed in is the hashed password, not the ACTUAL password
        if (err)
          return next(err)
        next(null, user)
      })
      res.redirect("/account")
    }
  })
})

module.exports = router
