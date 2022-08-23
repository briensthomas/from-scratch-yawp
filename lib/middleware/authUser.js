const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getReviewById(req.params.id);

    if (review.user_id !== req.user.id && req.user.email !== 'admin')
      throw new Error('You do not have access to complete this action');
        
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
  
