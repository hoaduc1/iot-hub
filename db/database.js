const { application } = require('express');
let mongoose = require('mongoose');

const mongodb_url = 'mongodb://localhost:27017/nodejs-demo'

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongodb_url, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connection successfully!");
                app.initial();
            })
            .catch(err => {
                console.log("Database connection error!");
            })
    }
}

module.exports = new Database();