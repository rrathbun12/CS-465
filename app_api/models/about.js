const mongoose = require('mongoose');

// Define the ad subdocument
const adSchema = new mongoose.Schema(
    {
        heading: {
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

// Define the content section subdocument
const sectionSchema = new mongoose.Schema(
    {
        heading: {
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

// Define the main About page schema
const aboutSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    introHeading: {
        type: String,
        required: true
    },
    introParagraphs: {
        type: String,
        required: true
    },
    ads: {
        type: [adSchema],
        required: true
    },
    sections: {
        type: [sectionSchema],
        required: true
    }
});

const About = mongoose.model('abouts', aboutSchema);

module.exports = About;