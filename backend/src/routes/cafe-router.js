const express = require('express');
const cafeController= require('../controllers/cafe-controller');


const cafeRouter = express.Router();

cafeRouter.get('/search', cafeController.getSearchedCafes); 
cafeRouter.get('/nearby', cafeController.getNearbyCafes);
cafeRouter.get('/:id', cafeController.getCafeDetailsById); 


module.exports = cafeRouter;
