const mongoose = require('mongoose');

// Define the room schema
const roomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;