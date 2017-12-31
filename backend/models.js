const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Document = mongoose.model('Document', {
    title: {
        type: String,
        required: true,
        unique: true
    },
    body: {
        type: String
    },
    inlineStyles: {
        type: Object
    },
});

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = {
    Document: Document,
    User: User
};
