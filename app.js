const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const http = require("http");
const port = process.env.PORT || 8080;
// const colyseus = require("colyseus");
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
//const userRoutes = require("./api/routes/users");
//const teamsRoutes = require("./api/routes/teams");
//const questionsRoutes = require("./api/routes/questions");

//console.log(process.env.MONGO_ATLAS_PW);

mongoose.connect(
  "mongodb+srv://RapidTest_786:fIXT7TwvHQCUkE8P@cluster0.9ghnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//app.use("/api/v1/users", userRoutes);
//app.use("/api/v1/teams", teamsRoutes);
//app.use("/api/v1/questions", questionsRoutes);
//app.use("/api/v1/games", gamesRoutes);
require("./startup/test")(app);
// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// app.use((req, res) => {
//     res.status(200).json({
//         message: 'Hello test'
//     });
// });

module.exports = app;
// var path = require('path');
// var looger = require('./logger')

// console.log(path);
// looger.log('I passeed value to fucntion of logger module');

// function sayHello(){
//     console.log('hello');
// }

// sayHello();
