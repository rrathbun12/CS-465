const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');


// Method to authenticate our JWT
function authenticateJWT(req, res, next) {

  // Pull Authorization header from request
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Auth Header Required but NOT PRESENT!');

    return res
      .status(401)
      .json({ message: 'Authorization header required' });
  }

  // Expected format:
  // Authorization: Bearer <token>
  const headers = authHeader.split(' ');

  if (headers.length !== 2 || headers[0] !== 'Bearer') {
    console.log('Invalid Authorization Header');

    return res
      .status(401)
      .json({ message: 'Invalid authorization header' });
  }

  const token = headers[1];

  if (!token) {
    console.log('Null Bearer Token');

    return res
      .status(401)
      .json({ message: 'Bearer token required' });
  }

  try {
    // Verify token using JWT secret from .env
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded JWT payload on request
    req.auth = verified;

    // Continue to protected route
    next();

  } catch (error) {
    console.log('Token Validation Error:', error.message);

    return res
      .status(401)
      .json({ message: 'Token Validation Error!' });
  }
}


// Authentication routes
router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);


// Trip collection routes
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);


// Individual trip routes
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);


module.exports = router;