const Article = require('../models/Articles');

exports.getArticles = async (req, res) => { 
    try {
        const articles = await Article.find({});
        return res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'There was an error fetching the article', error });
    }
}

exports.createArticle = async (req, res) => { 
    const { name, price, size } = req.body;
    try {
        const newArticle = await Article.create({ name, price, size  });
        return res.json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
}

exports.updateArticleById = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, price, size } = req.body;
        const updateArticle = await Article.findByIdAndUpdate(id, { name, price, size}, { new: true });
        res.json({updateArticle});
    } catch (error) {
        res.status(500).json({ message: 'There was an error updating the information', error });
    }
};

exports.deleteArticleById = async (req, res) => { 
    try {
        const { id } = req.params;
        const articleDeleted = await Article.findByIdAndDelete(id);
        return res.json({ articleDeleted});
    } catch (error) {
        res.status(500).json({ message: 'There was an error deleting the article, please try again', error });
    }
};
