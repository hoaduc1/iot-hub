const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.pruduct = require("./product.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;