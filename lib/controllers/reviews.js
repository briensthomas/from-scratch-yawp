const { Router } = require('express');
const authenticated = require('../middleware/authenticated');
const authUser = require('../middleware/authUser');
const Review = require('../models/Review');


module.exports = Router()
  .delete('/:id', authenticated, authUser, async (req, res, next) => {
    try {
      await Review.deleteReview(req.params.id);
      res.status(204).send();
    } catch(err) {
      next(err);
    }
  });
