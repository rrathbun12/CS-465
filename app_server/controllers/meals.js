var fs = require('fs');
var food = JSON.parse (fs.readFileSync('./data/food.json', 'utf8'));

/* GET food View */
const meals = (req, res) => {
    res.render('meals', {title: 'Meals', food, mealsActive: true});
};

module.exports = {
    meals,
}