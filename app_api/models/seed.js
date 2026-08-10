// Bring in the database connection and Mongoose models
const mongoose = require('./db');

const Trip = require('./travlr');
const Room = require('./rooms');
const News = require('./news');
const Meal = require('./meals');
const Contact = require('./contact');
const About = require('./about');
const Home = require('./home');

// Read seed data from the JSON files
const fs = require('fs');

const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

const rooms = JSON.parse(
    fs.readFileSync('./data/hotelrooms.json', 'utf8')
);

const newsData = JSON.parse(
    fs.readFileSync('./data/localnews.json', 'utf8')
);

const meals = JSON.parse(
    fs.readFileSync('./data/food.json', 'utf8')
);

const contactData = JSON.parse(
    fs.readFileSync('./data/contactData.json', 'utf8')
);

const aboutData = JSON.parse(
    fs.readFileSync('./data/aboutData.json', 'utf8')
);

const homeData = JSON.parse(
    fs.readFileSync('./data/homeData.json', 'utf8')
);

// Delete existing records and insert the seed data
const seedDB = async () => {
    try {
        // Remove existing records
        await Trip.deleteMany({});
        await Room.deleteMany({});
        await News.deleteMany({});
        await Meal.deleteMany({});
        await Contact.deleteMany({});
        await About.deleteMany({});
        await Home.deleteMany({});

        // Add updated seed records
        await Trip.insertMany(trips);
        await Room.insertMany(rooms);
        await News.create(newsData);
        await Meal.insertMany(meals);
        await Contact.create(contactData);
        await About.create(aboutData);
        await Home.create(homeData);

        console.log('All database collections seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Mongoose disconnected');
    }
};

seedDB();