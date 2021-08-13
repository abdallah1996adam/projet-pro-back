const express = require("express");

const tourController = require("../controllers/tourController");
const userController = require("../controllers/userController");
const tourImageController = require("../controllers/tourImagesController");
const isAuth = require('../middleware/isAuth')

const router = express.Router();

//user routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post('/userImage',isAuth, userController.addUserImg)

//tours routes post
router.post("/tours", tourController.addTour);

//tour routes get
router.get("/tours", tourController.getAllTours);
router.get("/tour:id", tourController.getById);

//user routes
router.post('/profile',isAuth, userController.getUser)

//tourImage routes
router.put('/tourImage',tourImageController.updateImage)

router.all("*", (request, response) => {
  response.status(404).json({ Error: "page not found !" });
});

module.exports = router;
