const TourImages = require("../models/toursImagesModel");

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
