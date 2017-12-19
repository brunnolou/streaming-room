const del = require('del');
const path = require('path');
const { passwords, videosPath, maxBuffer } = require('../config.json');
const chalk = require('chalk');
const { exec } = require('child_process');

const execute = (command, callback) => {
  exec(command, { maxBuffer: 1024 * maxBuffer }, callback);
};

const log = (data, color = 'blue') => {
  console.log(chalk[color](data));
};

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

const stringify = (obj) => {
  const stg = JSON.stringify(obj, null, '  ');

  return stg.replace(/[{}]+/g, '');
};

module.exports = {
  deleteVideos,
  execute,
  isAuth,
  log,
  stringify,
};
