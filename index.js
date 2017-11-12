const del = require("del");
const videoPath = "./public/videos/";

del.sync([videoPath + "*"]);

require("./src/");
