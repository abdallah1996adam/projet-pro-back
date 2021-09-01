require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const { request, response } = require("express");
const Booking = require("../models/bookingModel");
const Tours = require("../models/tourModel");
const TourImages = require("../models/toursImagesModel");

exports.addBooking = async (request, response) => {
  const userId = request.user.user_id;
  const { tourId } = request.body;
  const email = request.user.user_email;

  const tour = await Tours.findOne(tourId);

  const price = tour[0][0].price.split("").splice(0, 3).join("");

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${"http://localhost:3000/"}`,
      cancel_url: `${request.protocol}://${request.get("host")}/`,
      customer_email: email,
      client_reference_id: tourId,
      line_items: [
        {
          name: `${tour[0][0].tour_name} Tour`,
          description: `${tour[0][0].description}`,
          amount: `${price * 100}`,
          currency: "eur",
          quantity: 1,
        },
      ],
    });
    await Booking.addOne(userId, tourId);
    return response.status(200).json({
      message: "Vous allez recevoir un message de confirmation",
      session,
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      Error: error.message,
    });
  }
};

exports.getByID = async (request, response) => {
  const { userId } = request.body;

  try {
    const data = await Booking.getOne(userId);
    const tourId = data[0][0].tour_id;
    const tourData = await Tours.findOne(tourId);
    const ImageData = await TourImages.getByTourId(tourId);
    const tour = tourData[0]
    const Images = ImageData[0]

    return response.status(200).json({
      tour,
      Images,
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message,
    });
    console.log(error);
  }
};
