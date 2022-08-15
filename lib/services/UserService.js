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
    // console.log('UserService:', user);
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

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);
      //   console.log('User from Services', user);
      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.password_hash))
        throw new Error('Invalid password');
        
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      //   console.log('token from UserService:', token);
      return token;
    } catch(error) {
      error.status = 401;
      throw error;
    }
  }
};

