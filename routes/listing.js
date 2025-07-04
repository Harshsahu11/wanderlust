const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});



router.route("/")
    .get(wrapAsync(listingController.index))   //index route
    .post(isLoggedIn,
        validateListing,
        upload.single('listing[image][url]'),
        wrapAsync(listingController.createlisting)); //create Route


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put( isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updatListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;