require("dotenv").config();
const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    response.status(401).json({
      Error: "vous devez être connecté",
    });
  }
  const token = authorization.replace("Bearer ","");
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
    if (error) {
      return response.status(401).json({ Error: "vous devez être connecté" });
    }
    const {user, user_id, exp} = payload
    console.log(payload);
  });
  next();
};
