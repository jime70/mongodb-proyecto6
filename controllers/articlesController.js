const Article = require('../models/Articles');

exports.getArticles = async (req, res) => { 
    try {
        const articles = await Article.find({}).populate('category', 'name description type');
        return res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'There was an error fetching the article', error });
    }
}

exports.getArticlesById = async (req, res) => { 
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'There was an error fetching the article', error });
    }
}

exports.createArticle = async (req, res) => { 
    const { pic, name, size, description, price, category } = req.body;
    try {
        const newArticle = await Article.create({ pic, name, size, description, price, category  });
        return res.json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
}

exports.updateArticleById = async (req, res) => { 
    try {
        const { id } = req.params;
        const { pic, name, size, description, price, categories } = req.body;
        const updateArticle = await Article.findByIdAndUpdate(id, { pic, name, size, description, price, categories}, { new: true });
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
        res.status(500).json({ message: 'There was an error, please try again.', error });
    }
};
