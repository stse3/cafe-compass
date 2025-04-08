const express = require('express');
const cafeController= require('../controllers/cafe-controller');


const cafeRouter = express.Router();

//cafeRouter.get('/cafes', cafeController.getCafeFilter); 
cafeRouter.get('/cafes/nearby', cafeController.getNearbyCafes);
cafeRouter.get('/cafes/:id', cafeController.getCafeById);


module.exports = cafeRouter;
