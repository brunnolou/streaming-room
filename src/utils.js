const del = require('del');
const path = require('path');
const { passwords, videosPath } = require('../config.json');

const deleteVideos = () => {
  const videoGlob = path.join(__dirname, '..', videosPath, '*');

  del.sync([videoGlob]);
};

const isAuth = (username, pass) => {
  if (username === 'Admin') {
    const userPass = passwords.find(x => x.name === 'Admin');

    if (!userPass) return false;

    return userPass.password === pass;
  }

  return passwords.some(({ password }) => password === pass);
};

module.exports = {
  isAuth,
  deleteVideos,
};
