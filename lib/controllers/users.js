const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      res.json(users);
    } catch(e) {
      next(e);
    }
  });
