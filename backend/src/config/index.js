//central export point for all configs

const server = require("./server.config");
const firebase = require('./firebase.config');
const google = require('./google.config');


module.exports = {
    server,firebase,google
}