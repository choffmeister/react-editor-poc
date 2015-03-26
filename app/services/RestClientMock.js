
module.exports = function (method, url, payload) {
  return new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      if (url === '/test') {
        resolve({});
      } else {
        reject('Not found');
      }
    }, 250);
  });
};
