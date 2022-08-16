const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM yawp_restaurants'
    );
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_restaurants 
      WHERE id = $1;`,
      [id]
    );
    return new Restaurant(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `SELECT yawp_reviews.detail FROM yawp_restaurants
      LEFT JOIN yawp_reviews on yawp_restaurants.id = yawp_reviews.restaurant_id
      WHERE yawp_reviews.restaurant_id = $1`,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }


  
};

