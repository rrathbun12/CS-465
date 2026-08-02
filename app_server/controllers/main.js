var fs = require('fs');

var homeData = JSON.parse(
    fs.readFileSync('./data/homeData.json', 'utf8')
);

/* GET home page */
const index = (req, res) => {res.render('index', {title: 'Travlr Getaways', homeData, homeActive: true});
};

module.exports = {
    index
};