// this is a user object model/schema. this file will dictate how a user is organized in our database
const mongoose = require("mongoose") // need to imprt mongoose

const User = new mongoose.Schema({ // need to create a User schema, which is just a mongoose.Schema
  // define attributes of a user here
  // the keys and values of the json object let you define even further the attributes of a User
  email: {type: String, default: ""}, // default: "" means that if no email is specified, then the default email is the empty string
  password: {type: String, default: ""},
  timestamp: {type: Date, default: Date.now}, // timestamp of when the user signed up
})

module.exports = mongoose.model("User", User) // this exports the schema User (the variable User passed in the second argument)
// we can now use the above schema to create an actual User in our database
// if you recall, the data is recieved in the register.js file.
