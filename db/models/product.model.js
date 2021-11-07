var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'No Name'
    },
    type: {
        type: String,
        default: 'No Type'
    },
    price: {
        type: String,
        default: 'No Type'
    }
});

module.exports = mongoose.model('Product', productSchema, 'products');