const express = require('express');
const { createArticle, getArticles, getArticlesById, updateArticleById, deleteArticleById} = require('../controllers/articlesController')

const ArticlesRoutes = express.Router();

ArticlesRoutes.get('/', getArticles); //localhost:3003/api/articles/
ArticlesRoutes.get('/:id', getArticlesById); //localhost:3003/api/articles/:id
ArticlesRoutes.post('/create', createArticle);  //localhost:3003/api/articles/create
ArticlesRoutes.put('/update-articles/:id', updateArticleById); //localhost:3003/api/articles/update-articles/:id
ArticlesRoutes.delete('/delete-articles/:id', deleteArticleById); //localhost:3003/api/articles/delete-articles/:id

module.exports = ArticlesRoutes;