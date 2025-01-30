const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 3004;

app.use(express.json());
app.use(cors());
connectDB();

const ArticlesRoutes = require('./routes/articlesRoutes');
const ClientRoutes = require('./routes/clientRoutes');

app.use('/api/articles', ArticlesRoutes); 
app.use('/api/clients', ClientRoutes); 


app.listen(port, () => { 
    console.log(`Server running on port ${port}`);
})