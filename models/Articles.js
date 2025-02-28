const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    pic: {
        type: String,
        required: function(){ return this.isNew },
        trim: true
    },
    name: {
        type: String,
        required: function(){ return this.isNew },
        trim: true,
        unique: true
    },
    size: {
        type: String,
        required: function(){ return this.isNew },
        trim: true
    },
    description: {
        type: String,
        required: function(){ return this.isNew },
        trim: true
    },
    price: {
        type: Number,
        required: function(){ return this.isNew }
    },
    category: { // 🔹 Cambiado de categoryProduct a category
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
