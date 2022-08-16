const { Router } = require('express');
const Restaurant = require('../models/Restaurants');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Restaurant.getAll();
      res.json(data);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      await restaurant.getReviews();
      res.json(restaurant);
    } catch(err) {
      next(err);
    }
  })
;
