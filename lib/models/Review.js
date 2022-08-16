const pool = require('../utils/pool');
const Restaurant = require('./Restaurants');
const User = require('./User');
module.exports = class Review {
  id;
  restaurant_id;
  user_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async insertReview({ restaurant_id, user_id, stars, detail }) {
    const review = await Restaurant.getById(restaurant_id);
    if (!review) return null;
    const user = await User.getUserId(user_id);
    if (!user) return null;

    const { rows } = await pool.query(
      `INSERT INTO yawp_reviews
      (restaurant_id, user_id, stars, detail)
      VALUES ($1, $2, $3, $4)
      RETURNING stars, detail;`,
      [restaurant_id,
        user_id,
        stars,
        detail]
    );
    return new Review(rows[0]);
  }
};
