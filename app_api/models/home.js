const mongoose = require('mongoose');

// Define the adbox subdocument
const adboxSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
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

// Define each blog entry
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

// Define the testimonial
const testimonialSchema = new mongoose.Schema(
    {
        quote: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

// Define each sidebar link
const sidebarLinkSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

// Define the main homepage schema
const homeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    adbox: {
        type: adboxSchema,
        required: true
    },
    latestBlog: {
        type: [blogSchema],
        required: true
    },
    testimonial: {
        type: testimonialSchema,
        required: true
    },
    sidebarLinks: {
        type: [sidebarLinkSchema],
        required: true
    }
});

const Home = mongoose.model('homepages', homeSchema);

module.exports = Home;