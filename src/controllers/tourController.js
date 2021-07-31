const { uuid } = require("uuidv4");
const Tours = require("../models/tourModel");
const TourImages = require("../models/toursImagesModel");
const convertImages = require("../utils/convertImage");

exports.addTour = async (request, response) => {
  const {
    name,
    guide,
    price,
    rating,
    description,
    duration,
    maxPeople,
    location,
    date,
    user_id,
  } = request.body;

  const { image1, image2, image3, image4 } = request.files;

  const id = uuid();

  const img1 = await convertImages(image1);
  const img2 = await convertImages(image2);
  const img3 = await convertImages(image3);
  const img4 = await convertImages(image4);

  try {
    const newTour = {
      id,
      name,
      guide,
      price,
      rating,
      description,
      duration,
      maxPeople,
      location,
      date,
      user_id,
    };

    await Tours.addOne(newTour);
    await TourImgaes.addImage(id, img1, img2, img3, img4);

    return response.status(201).json({
      success: "the tour has been added successfully",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ Error: error.message });
  }
};

exports.getAllTours = async (request, response) => {
  try {
    const result = await Tours.findAll();
    const tours = result[0];

    let results = [];

    for (let tour of tours) {
      const imagesData = await TourImages.getByTourId(tour.id);
      const images = imagesData[0]
      results.push({ ...tour, images });
    }

    
    return response.status(200).json({
      results,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({ Error: error.message });
  }
};


exports.getById= async(request, response)=>{
  const id = request.params.id.slice(2,38)

  let tour = []
  
 
  try{
    const data = await Tours.findOne(id)
    const imagesData = await TourImages.getByTourId(id);
    const result = data[0]
    const images = imagesData[0]
    tour.push({...result, images})
    return response.status(200).json({
      tour
    })

  }catch(error){
    return response.status(400).json({
      Error:error.message
    })
  }
}