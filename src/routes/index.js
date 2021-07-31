const express = require("express");

const tourController = require("../controllers/tourController");
const userController = require("../controllers/userController");
const tourImageController = require("../controllers/tourImagesController");

const router = express.Router();

//user routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//tours routes post
router.post("/tours", tourController.addTour);

//tour routes get
router.get("/images", tourImageController.getImages);
router.get("/tours", tourController.getAllTours);
router.get("/tour:id", tourController.getById);

router.all("*", (request, response) => {
  response.status(404).json({ Error: "page not found !" });
});

module.exports = router;
