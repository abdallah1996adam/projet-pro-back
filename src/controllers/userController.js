require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/userModel");
const verifyInputs = require("../utils/verfiyInputs");
const convertImage = require('../utils/convertImage')

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
          user_email : result[0][0].emailId 
        };

        const token = await jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return response.status(201).json({ token, user });
        // jwt.sign(userObject, SECRET, (errorJWT, token) => {
        //   if (errorJWT) {
        //     console.log("CREATION TOKEN FAILED ", errorJWT);
        //     res.send(error.message);
        //   }
        //   (req.user = userObject), token;
        //   console.log("TOKEN IN BACK ", token);

        //   return res.status(200).json({
        //     token,
        //     userId: userObject.userId,
        //   });
        // });
      }
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ Error: "sevrver Error " });
  }
};

exports.getUser = async (request, response) => {


  const id = request.user.user_id

  try {
    const data = await Users.getOne(id) 
    const userData = data[0][0]
    return response.status(200).json({
      userData
    })

  } catch (error) {
    console.error(error);
    return response.status(500).json({
      Error: error.message,
    });
   
  }
};



exports.addUserImg = async(request, response)=>{


  if(!request.files){
    return response.status(400).json({
      message:"vous devez uploadez une image"
    })
  }
  const {file} = request.files
  const id = request.user.user_id;

  if (
    request.files.file.mimetype != "image/jpg" &&
    request.files.file.mimetype != "image/png" &&
    request.files.file.mimetype != "image/jpeg"
  ){
    return response.status(405).json({
      message:"le type d'image doit  être (jpg,png,jpeg)"
    });
  }else if (request.files.file.size > 2000000){
   return response.status(405).json({
     message:"la taille doit être moins de 2MB"
   })
  } 

 

  const imgData = await convertImage(file)

  try{
     await Users.addImg(imgData, id)
     const newData = await Users.getOne(id)
     const userUpdate = newData[0][0]
     return response.status(200).json({
       success: "l'image a été mise à jour",
       userUpdate
     })

  }catch(error){
    console.log(error);
    return response.status(500).json({
      Error:error.message
    })
  }
}


exports.updateOne = async (request, response)=>{

  const {password} = request.body
  const id = request.user.user_id
  try {
    const hash = await bcrypt.hash(password, 10)
    await Users.updatePassword(hash, id)
    return response.status(201).json({
      success: "Voter mot de passe a été modifié avec succès"
    })
  } catch (error) {
    return response.status(500).json({
      Error: error.message
    })
  }
}