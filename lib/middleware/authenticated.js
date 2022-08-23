const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // console.log('req.url', req.url); //The route that's being accessed
  // console.log(' req.method',  req.method); //Receiving a GET or a POST?
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    // console.log('cookie from middleware', cookie); //are we getting a cookie?
    // console.log('!cookie', !cookie); //double confirm that there is in fact a cookie
    if (!cookie) throw new Error('You must be signed in to continue');
    
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    // console.log('Authenticated middleware', user);
    req.user = user;

    next();
  } catch(err) {
    // console.log('catch(err)', err);
    err.status = 401;
    next(err);
  }
};
