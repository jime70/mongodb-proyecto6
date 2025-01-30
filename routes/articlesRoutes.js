const express = require('express');
const { createArticle, getArticles, updateArticleById, deleteArticleById} = require('../controllers/articlesController')

const ArticlesRoutes = express.Router();

ArticlesRoutes.get('/', getArticles); //localhost:3003/api/articles/
ArticlesRoutes.post('/add-articles', createArticle);  //localhost:3003/api/articles/add-articles
ArticlesRoutes.put('/update-articles/:id', updateArticleById); //localhost:3003/api/articles/update-articles/:id
ArticlesRoutes.delete('/delete-articles/:id', deleteArticleById); //localhost:3003/api/articles/delete-articles/:id

module.exports = ArticlesRoutes;