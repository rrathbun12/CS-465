var fs = require('fs');
var aboutData = JSON.parse (fs.readFileSync('./data/aboutData.json', 'utf8'));

/* GET about View */
const about = (req, res) => {
    res.render('about', {title: 'About', aboutData, aboutActive: true});
};

module.exports = {
    about,
}