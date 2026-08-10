const express = require('express'); // Express app
const router = express.Router();    // Router logic

// import the controllers to route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); 

// GET method routes tripsFindByCode 
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;