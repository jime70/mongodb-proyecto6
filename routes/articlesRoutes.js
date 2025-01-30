const express = require('express');
const { createArticle, getArticles, getArticlesById, updateArticleById, deleteArticleById} = require('../controllers/articlesController')

const ArticlesRoutes = express.Router();

ArticlesRoutes.post('/create', createArticle);  //localhost:3003/api/articles/create
ArticlesRoutes.get('/readall', getArticles); //localhost:3003/api/articles/readall
ArticlesRoutes.get('/readone/:id', getArticlesById); //localhost:3003/api/articles/readone/:id
ArticlesRoutes.put('/update-articles/:id', updateArticleById); //localhost:3003/api/articles/update-articles/:id
ArticlesRoutes.delete('/delete-articles/:id', deleteArticleById); //localhost:3003/api/articles/delete-articles/:id

module.exports = ArticlesRoutes;