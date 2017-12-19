const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const i18n = require('i18n');
const path = require('path');
const ip = require('my-ip');
const publicIp = require('public-ip');

const { isAuth, log } = require('./utils');

const port = process.env.PORT || 3000;

const protect = (req, res, next) => {
  if (!req.signedCookies.username) {
    res.redirect('/');
  }

  next();
};

function webServer(app, server) {
  server.listen(port, '0.0.0.0', () => {
    log('');
    log('Web server is running on:', 'white');
    log(`http://localhost:${port}`);
    log(`http://${ip()}:${port}`);

    publicIp
      .v4()
      .then((v4) => {
        log('Your external IP is:', 'white');
        log(`http://${v4}`);
        log('');
      })
      .catch(() => log('Cannot get external IP'));
  });

  // Cookie secret.
  const secret = 'Mmm98N)8bewd88';
  app.use(cookieParser(secret));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for x-www-form-urlencoded
  app.use('/videos', protect);
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // i18n
  i18n.configure({
    locales: ['pt', 'en'],
    queryParameter: 'lang',
    directory: path.join(__dirname, 'locales'),
  });
  app.use(i18n.init);

  // View engine.
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'pages'));

  // Routes.
  app.get('/', (req, res) => {
    res.render('index', { title: 'The index page!' });
  });

  app.post('/login', (req, res) => {
    if (req.signedCookies.username) return res.send({ data: 'OK' });

    const { password, username } = req.body;

    if (!isAuth(username, password)) return res.status(401).send({ error: 'Unauthorized' });

    // read cookies
    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1 month.
      httpOnly: false, // The cookie only accessible by the web server
      signed: true, // Indicates if the cookie should be signed,
    };

    // Set cookie
    res.cookie('username', username, options);
    return res.send({ username });
  });

  app.get('/logout', (req, res) => {
    res.cookie('username', '');
    res.redirect('/');
  });
}

module.exports = webServer;
