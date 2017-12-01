// Setup basic express server
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const chalk = require("chalk");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const i18n = require("i18n");
const passwords = require("../config.json").passwords;

const isAuth = (username, pass) => {
  if (username === "Admin") {
    const userPass = passwords.find(x => x.name === "Admin");

    if (!userPass) return;

    return userPass.password === pass;
  }

  return passwords.some(({ password }) => password === pass);
};

const port = process.env.PORT || 3000;

server.listen(port, function() {});

const protect = (req, res, next) => {
  if (!req.signedCookies.username) {
    res.redirect("/");
  }

  next();
};

// Cookie secret.
const secret = "Mmm98N)8bewd88";

app.use(cookieParser(secret));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/videos", protect);
app.use(express.static(path.join(__dirname, "..", "public")));

// i18n
i18n.configure({
  locales: ["pt", "en"],
  queryParameter: "lang",
  directory: path.join(__dirname, "locales")
});
app.use(i18n.init);

// View engine.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.get("/", function(req, res) {
  res.render("index", { title: "The index page!" });
});

app.post("/login", (req, res) => {
  if (req.signedCookies.username) return res.send({ data: "OK" });

  var username = req.body.username;
  var password = req.body.password;

  if (!isAuth(username, password))
    return res.status(401).send({ error: "Unauthorized" });

  // read cookies
  let options = {
    maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1 month.
    httpOnly: false, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed,
  };

  // Set cookie
  res.cookie("username", username, options);
  res.send({ username: username });
});

app.get("/logout", (req, res) => {
  res.cookie("username", "");
  res.redirect("/");
});

// Chatroom.
var numUsers = 0;
const usersCount = {};
const userAdd = (user, x = 1) => {
  if (!usersCount[user]) {
    usersCount[user] = 1;
    return usersCount;
  }

  usersCount[user] = usersCount[user] + x;

  return usersCount;
};

io.on("connection", function(socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", function(data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", function(username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    userAdd(username);
    ++numUsers;
    addedUser = true;

    if (usersCount.Admin) delete usersCount.Admin;

    socket.emit("login", {
      numUsers: numUsers,
      usersCount
    });

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
      usersCount
    });

    console.log(chalk.bold("In ") + chalk.green(" > " + socket.username));
    console.log(JSON.stringify(usersCount, null, "  "));
    console.log(chalk.bold("Total: ") + chalk.yellow(numUsers));
    console.log("");
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", function() {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", function() {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", function() {
    if (addedUser) {
      --numUsers;
      userAdd(socket.username, -1);

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers,
        usersCount
      });

      console.log(chalk.bold("Out") + chalk.red(" < " + socket.username));
      console.log(JSON.stringify(usersCount, null, "  "));
      console.log(chalk.bold("Total: ") + chalk.yellow(numUsers));
      console.log("");
    }
  });
});

// Start stream server.
require("./stream");
