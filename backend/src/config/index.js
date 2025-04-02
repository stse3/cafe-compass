//central export point for all configs

const server = require("./server.config");
const google = require('./google.config');


module.exports = {
    server, google
}