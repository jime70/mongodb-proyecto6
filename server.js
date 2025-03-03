const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const ArticlesRoutes = require('./routes/articlesRoutes');
const ClientRoutes = require('./routes/clientRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/articles', ArticlesRoutes); 
app.use('/api/clients', require("./routes/clientRoutes") ); 

const port = process.env.PORT || 3004;

app.listen(port, () => { 
    console.log(`Server running on port ${port}`);
})