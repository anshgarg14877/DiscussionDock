const mongoose = require('mongoose');
const { string } = require('zod');

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    community: {
        type: String,
        required: true
    }, 
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    imageUrl: {
        type: String
    }
});

module.exports = mongoose.model('Post', postSchema);