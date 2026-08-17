const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - all trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: 'No trips found' });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - single trip
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ code: req.params.tripCode })
        .exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: 'Trip not found' });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - add a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const q = await newTrip.save();

        return res
            .status(201)
            .json(q);

    } catch (error) {
        console.log(error);

        return res
            .status(400)
            .json({
                message: 'Unable to add trip',
                error: error.message
            });
    }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Model.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res
        .status(404)
        .json({ message: 'Trip not found' });
    }

    trip.code = req.body.code;
    trip.name = req.body.name;
    trip.length = req.body.length;
    trip.start = req.body.start;
    trip.resort = req.body.resort;
    trip.perPerson = req.body.perPerson;
    trip.image = req.body.image;
    trip.description = req.body.description;

    const updatedTrip = await trip.save();

    return res
      .status(200)
      .json(updatedTrip);

  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({
        message: 'Unable to update trip',
        error: error.message
      });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};