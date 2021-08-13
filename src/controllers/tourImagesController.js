const TourImages = require("../models/toursImagesModel");
const convertImages = require('../utils/convertImage')

exports.getImages = async (request, response) => {
  try {
    let images = await TourImages.getAll();
    images = images[0];

    return response.status(200).json({
      data: images,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ Error: error.message });
  }
};


exports.updateImage = async(request, response)=>{
  // const {file} = request.body
  // console.log("tourimageController",file);
  try{


  }catch(error){
    console.error(error);
    return response.status(500).json({
      Error: error.message
    })
  }
}
