const mongoose = require('mongoose');

// Define the contact information subdocument
const contactInfoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

// Define the main contact page schema
const contactSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    contactInfo: {
        type: [contactInfoSchema],
        required: true
    }
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;