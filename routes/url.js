//imports
const express = require("express");
const { handleGenerateNewShortenedURL,handleGetShortenedURL,handleGetAnalytics } = require("../controllers/url");


const router = express.Router();

router.post('/', handleGenerateNewShortenedURL);

router.get("/analytics/:shortenedURL", handleGetAnalytics);

router.route("/:shortenedURL").get(handleGetShortenedURL);

//exports
module.exports = router;