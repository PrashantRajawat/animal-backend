const express = require("express");
const { getNearbyVets } = require("../controllers/places.controller");

const router = express.Router();

router.post("/", getNearbyVets);

module.exports = router;
