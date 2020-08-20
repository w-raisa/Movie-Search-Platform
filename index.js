const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const httpMsgs = require("http-msgs") // npm install --save http-msgs
const fetch = require('node-fetch');
const home = require("./routes/home")
const login = require("./routes/login")
const register = require("./routes/register")
const account = require("./routes/account")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/movies", (err, data) =>{ // here we establish a database conenction
  if (err) { // if some kind of error occurs
    console.log("DB Connection Failed")
    return // return so that the code deosn't continue
  }
  console.log("DB Connection Success") // once it successfulyl conencts you can set up models and data to store in your db.
})


const app = express()

app.listen(9000)
console.log("Listening on port 9000")

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.json()) // telling the app to parse our form data as json
app.use(express.urlencoded({extended: false})) // enables us to recive form data and properly parseinto the corresponding parts

// need to set the express app to use hogan templating engine

app.use("/", home)
app.use("/login", login)
app.use("/register", register)
app.use("/account", account)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hjs") // setting  the express app to use the hogan templating engine

app.use(express.static("assets"))

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "/index.html"))
// })

app.use(express.static(__dirname + '/public/')); // joins the public assets directory (the directory named public) to this app



app.post("/trending", function(req, res) {
  //var data = req.body
  //console.log(req.body.text + "hehe")

  //fetch("http://ip-api.com/json/" + req.body.text)
  fetch("https://api.themoviedb.org/3/trending/all/day?api_key=0b4e4002ebf8acbf8c0fbdf66232a0f9")
    .then(res => res.json())
    .then(data => {
      //res.send({ data });
      httpMsgs.sendJSON(req, res, {
        from: data
      })
    })
    .catch(err => {
      res.redirect('/error');
    });

})

app.post("/search", (req, res, next) => {
  var data = req.body
  fetch("https://api.themoviedb.org/3/search/movie?api_key=0b4e4002ebf8acbf8c0fbdf66232a0f9" + "&query=" + req.body.text)
    .then(res => res.json())
    .then(data => {
      //res.send({ data });
      httpMsgs.sendJSON(req, res, {
        from: data
      })
    })
    .catch(err => {
      res.redirect('/error');
    });
})
