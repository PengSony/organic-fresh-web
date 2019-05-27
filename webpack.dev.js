const fs = require('fs');

const webpackRoot = require('./webpack');

let optVersion = '';

try {
  // Try loading commit hash
  let commitHash = fs.readFileSync(`${__dirname}/../../build/COMMITHASH`);
  commitHash = Buffer.from(commitHash).toString('utf8');
  optVersion = `-${commitHash}`;
} catch (e) {
  optVersion = '';
  // console.log('debuging only - load commit hash from file error');
}


module.exports = webpackRoot(optVersion);
