const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const password_hash = await bcrypt.hash(
      password, 
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      password_hash
    });
    console.log('UserService:', user);
    try {
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return [user, token];
    } catch(error) {
      error.status = 401;
      throw error;
    }

  }
};

