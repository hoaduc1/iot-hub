const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name'
    }
});

module.exports = mongoose.model('Role', productSchema, 'roles');
