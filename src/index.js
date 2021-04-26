const express = require("express");
const cors = require('cors')
require("dotenv").config();
const UserRoute = require("./routes/user");
require("./db/mongoose");

const port = process.env.PORT || 4000;
const app = express();

// serving up the user route json middleware
app.use(express.json());
app.use(UserRoute);
app.use(cors())

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
