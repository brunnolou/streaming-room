const del = require("del");
const path = require("path");
const { videosPath } = require("./config.json");

const videoGlob = path.join(__dirname, videosPath, "*");

del.sync([videoGlob]);

require("./src/");
