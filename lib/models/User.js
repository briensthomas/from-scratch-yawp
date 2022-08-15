const pool = require('../utils/pool');

module. exports = class User {
  id;
  created_at;
  email;
  #password_hash;

  constructor(row) {
    this.id = row.id;
    this.created_at = row.created_at;
    this.email = row.email;
    this.#password_hash = row.password_hash;
  }

  static async insert({ email, password_hash }) {
    const { rows } = await pool.query(
      `INSERT INTO yawp_users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email;`,
      [email, password_hash]
    );
    return new User(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_users
      WHERE email=$1`,
      [email]
    );
    if (!rows[0]) return null;

    return new User(rows[0]);
  }
  
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM yawp_users'
    );
    return rows.map((row) => new User(row));
  }

  get password_hash() {
    return this.#password_hash;
  }
  
};
