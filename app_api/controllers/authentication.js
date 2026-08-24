const passport = require('passport');

const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
  // Validate request to ensure all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    // Generate salt and password hash
    user.setPassword(req.body.password);

    // Save user to MongoDB
    const q = await user.save();

    // Generate JSON Web Token
    const token = q.generateJWT();

    return res
      .status(200)
      .json(token);

  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Unable to register user',
        error: error.message
      });
  }
};


// Login an existing user
const login = (req, res) => {
  // Validate request to ensure email and password are present
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'All fields required' });
  }

  // Delegate authentication to Passport
  passport.authenticate(
    'local',
    (err, user, info) => {

      if (err) {
        // Error during authentication
        return res
          .status(404)
          .json(err);
      }

      if (user) {
        // Authentication succeeded
        const token = user.generateJWT();

        return res
          .status(200)
          .json({ token });
      }

      // Authentication failed
      return res
        .status(401)
        .json(info);
    }
  )(req, res);
};


// Export methods that drive endpoints
module.exports = {
  register,
  login
};