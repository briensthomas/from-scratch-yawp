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
  });
