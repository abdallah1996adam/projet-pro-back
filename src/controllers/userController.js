require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const verifyInputs = require("../utils/verfiyInputs");
const { request, response } = require("express");

exports.signup = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  //CheckInputs
  const { Status, Msg } = verifyInputs(request.body);

  //return error messages
  if (Status) {
    return response.status(Status).json({ Error: Msg });
  }

  try {
    const result = await Users.findOne(email);

    //sending a request to database to check if the email doesn't already exist
    if (result[0].length == 0) {
      //hashing password
      const hash = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        password: hash,
        firstName,
        lastName,
      };

      await Users.addOne(newUser);

      return response.status(201).json({
        success: "the user has been added",
        data: {
          email,
          firstName,
          lastName,
        },
      });
    } else {
      return response.status(409).json({ Error: "user exists already !" });
    }
  } catch (error) {
    console.error(error.message);
    return response.status(400).json({ Message: "server error" });
  }
};

exports.login = async (request, response) => {
  const { email, password } = request.body;

  try {
    //sending request to verify the user email
    const result = await Users.findOne(email);
    if (result[0].length == 0) {
      return response.status(404).json({ Error: "this user doesn't exist !" });
    } else {
      const hash = result[0][0].password;

      const isCorret = await bcrypt.compare(password, hash);

      if (!isCorret) {
        return response
          .status(402)
          .json({ Error: "invalid email or password" });
      } else {
        const user = {
          user_id: result[0][0].id,
        };

        const token = await jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return response.status(201).json({ token, user });
      }
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ Error: "sevrver Error " });
  }
};

exports.getUser = async (request, response) => {

  const id = request.params

  try {
    // const userData = await Users.getOne(id) 
    // return response.status(200).json({
    //   userData
    // })

  } catch (error) {
    console.error(error);
    return response.status(500).json({
      Error: error,
    });
   
  }
};
