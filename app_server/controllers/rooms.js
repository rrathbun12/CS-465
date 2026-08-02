var fs = require('fs');
var hotelrooms = JSON.parse (fs.readFileSync('./data/hotelrooms.json', 'utf8'));

/* GET room View */
const rooms = (req, res) => {
    res.render('rooms', {title: 'Rooms', hotelrooms, roomsActive: true});
};

module.exports = {
    rooms,
}