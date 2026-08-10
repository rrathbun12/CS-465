const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

// Old JSON method
// var fs = require('fs');
// var trips = JSON.parse(
//     fs.readFileSync('./data/trips.json', 'utf8')
// );

/* GET travel view */
const travel = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;

            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else if (!json.length) {
                message = 'No trips exist in our database!';
            }

            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json,
                message,
                travelActive: true
            });
        })
        .catch(err =>
            res.status(500).send(err.message)
        );
};

/* GET trip details view */
const travelDetails = async (req, res) => {
    const tripEndpoint =
        `${tripsEndpoint}/${req.params.tripCode}`;

    await fetch(tripEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;

            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else if (!json.length) {
                message = 'Trip not found';
            }

            res.render('travelDetails', {
                title: 'Trip Details',
                trip: json[0],
                message,
                travelActive: true
            });
        })
        .catch(err =>
            res.status(500).send(err.message)
        );
};

module.exports = {
    travel,
    travelDetails
};