const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/user");
const ErrorHandler =require('./middlewares/errorHandlers')
require("dotenv").config();
require("./db/mongoose");

const port = process.env.PORT || 4000;
const app = express();

// serving up the user route json middleware
app.use(cors());
// second fix to the cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(UserRoute);
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
