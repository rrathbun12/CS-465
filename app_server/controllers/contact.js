var fs = require('fs');
var contactData = JSON.parse (fs.readFileSync('./data/contactData.json', 'utf8'));

/* GET travel View */
const contact = (req, res) => {
    res.render('contact', {title: 'Contact', contactData, contactActive: true});
};

module.exports = {
    contact,
}