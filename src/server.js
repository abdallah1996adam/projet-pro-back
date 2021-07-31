require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');

const router = require("./routes/");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.static('public'));
server.use(fileUpload({
  createParentPath: true
}));
server.use(express.urlencoded({ extended: true }));



server.use("/api/", router);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`server is up and running on port ${process.env.SERVER_PORT}`);
});
