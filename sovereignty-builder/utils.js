const ncp = require('ncp').ncp;

function ncpPromise(source, destination, options) {
  if(options) {
    return new Promise((res, rej) => {
      ncp(source, destination, options, (err) => {
        if(err) {
          rej(err);
        } else {
          res();
        }
      })
    })
  } else {
    return new Promise((res, rej) => {
      ncp(source, destination, (err) => {
        if(err) {
          rej(err);
        } else {
          res();
        }
      })
    })
  }
}

module.exports = { ncpPromise }
