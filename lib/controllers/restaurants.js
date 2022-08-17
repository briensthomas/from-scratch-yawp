const { Router } = require('express');
const Restaurant = require('../models/Restaurants');
const Review = require('../models/Review');
const authenticated = require('../middleware/authenticated');


module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
      await restaurant.getReviews();
      res.json(restaurant);
    } catch(err) {
      next(err);
    }
  })

  .get('/?type=', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getByType(req.body);
      const restaurant = restaurants.map((restaurant) => ({ 
        name: restaurant.name,
        type: restaurant.type }));
      res.json(restaurant);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch(err) {
      next(err);
    }
  })
  
  .post('/:restId/reviews', authenticated, async (req, res, next) => {
    try {
      // console.log('req.body from controllers', req.body);
      const review = await Review.insertReview({
        restaurant_id: req.params.restId, 
        user_id: req.user.id,
        ...req.body });
      res.json(review);
    } catch(err) {
      next(err);
    }
  })
;
