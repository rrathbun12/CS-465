const mongoose = require('mongoose');

// Schema for each sidebar link
const newsLinkSchema = new mongoose.Schema(
    {
        title: {
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

// Schema for the featured article
const featuredArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        paragraphs: {
            type: [String],
            required: true
        }
    },
    {
        _id: false
    }
);

// Main news-page schema
const localNewsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    latestNews: {
        type: [newsLinkSchema],
        required: true
    },
    vacationTips: {
        type: [newsLinkSchema],
        required: true
    },
    featuredArticle: {
        type: featuredArticleSchema,
        required: true
    }
});

const LocalNews = mongoose.model('localnews', localNewsSchema);

module.exports = LocalNews;