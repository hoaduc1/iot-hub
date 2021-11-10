const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  username: {
    type: String,
    default: 'No Name'
  },
  email: {
    type: String,
    default: 'No Name'
  },
  password: {
    type: String,
    default:  'No Name'
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

module.exports = mongoose.model('User', productSchema, 'users');
