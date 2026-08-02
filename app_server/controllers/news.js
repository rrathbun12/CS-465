var fs = require('fs');
var localNews = JSON.parse (fs.readFileSync('./data/localnews.json', 'utf8'));

/* GET news View */
const news = (req, res) => {
    res.render('news', {
        title: 'News',
        latestNews: localNews.latestNews,
        vacationTips: localNews.vacationTips,
        featuredArticle: localNews.featuredArticle,
        newsActive: true
    });
};

module.exports = {
    news,
}