const express = require('express');
const cafeRoutes = express.Router();


const {searchCafes, getCafeDetails, filterCafes, addRatings, addTags, getRatings, getTags, getMap} = require("../controllers/cafe-controller.js");

cafeRoutes.get('/search',searchCafes); //get cafes based on search criteria
cafeRoutes.get('/:id',getCafeDetails);//get cafe by specific id
//cafeRoutes.get('/featured', getFeaturedCafes); //get featured cafes 
cafeRoutes.post('/:id/rate',addRatings); 
cafeRoutes.post('/:id/tags',addTags);
cafeRoutes.get("/:id/ratings",getCafeRatings);
cafeRoutes.get("/:id/tags",getCafeTags);
cafeRoutes.get("/map",getMap); //map integration

module.exports = cafeRoutes;
