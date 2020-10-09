const express = require("express");
const { dbConnection } = require("./database/congif");
const cors = require("cors");
require("dotenv").config();

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routers/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server in port ${process.env.PORT}`);
});
