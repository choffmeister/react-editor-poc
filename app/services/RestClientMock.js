var Router = function () {
  var routes = [];

  var matchUrl = function (pattern, url) {
    var variableNames = [];
    var regex = new RegExp('^' + pattern.replace(/\{([^\}]+)\}/g, function (_, variableName) {
      variableNames.push(variableName);
      return '([^\\/]+)';
    }) + '$');

    var match = url.match(regex);
    if (match) {
      var values = {};
      for (var i = 0, l = variableNames.length; i < l; i++) {
        values[variableNames[i]] = match[i + 1];
      }
      return values;
    }
    return null;
  };

  var addRoute = function (method, pattern, callback) {
    routes.push({
      method: method,
      pattern: pattern,
      callback: callback
    });
  };

  var handle = function (method, url, payload) {
    for (var i = 0, l = routes.length; i < l; i++) {
      if (routes[i].method == method) {
        var values = matchUrl(routes[i].pattern, url);
        if (values) {
          return routes[i].callback(values, payload);
        }
      }
    }

    return null;
  };

  return {
    addRoute: addRoute,
    handle: handle
  };
}


module.exports = function (method, url, payload) {
  var router = new Router();
  router.addRoute('GET', '/shops', function () {
    return [
      {
        id: 'demoshop',
        displayName: 'Demo Shop I'
      },
      {
        id: 'demoshop2',
        displayName: 'Demo Shop II'
      }
    ]
  });
  router.addRoute('GET', '/shops/{shopId}/pages', function (values) {
    switch (values.shopId) {
      case 'demoshop':
        return [
          {
            id: 'homepage',
            displayName: 'Home'
          },
          {
            id: 'aboutpage',
            displayName: 'About'
          }
        ];
      case 'demoshop2':
        return [
          {
            id: 'homepage',
            displayName: 'Home'
          }
        ];
      default:
        throw new Error();
    }
  });
  router.addRoute('GET', '/shops/{shopId}/pages/{pageId}', function (values) {
    switch (values.shopId) {
      case 'demoshop':
        switch (values.pageId) {
          case 'homepage':
            return {
              rows: [
                {
                  columns: [
                    {
                      elements: [
                        {
                          id: 'plugin1',
                          type: 'text',
                          data: {
                            content: 'Lorem ipsum'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  columns: [
                    {
                      elements: [
                        {
                          id: 'image1',
                          type: 'image',
                          data: {
                            src: 'http://placehold.it/150x150',
                            alt: 'A beautiful image'
                          }
                        }
                      ]
                    },
                    {
                      elements: [
                        {
                          id: 'image2',
                          type: 'image',
                          data: {
                            src: 'http://placehold.it/150x160',
                            alt: 'A beautiful image'
                          }
                        }
                      ]
                    },
                    {
                      elements: [
                        {
                          id: 'image3',
                          type: 'image',
                          data: {
                            src: 'http://placehold.it/150x170',
                            alt: 'A beautiful image'
                          }
                        }
                      ]
                    },
                    {
                      elements: [
                        {
                          id: 'image4',
                          type: 'image',
                          data: {
                            src: 'http://placehold.it/150x180',
                            alt: 'A beautiful image'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            };
          case 'aboutpage':
            return {
              rows: [
                {
                  columns: [
                    {
                      elements: [
                        {
                          id: 'plugin1',
                          type: 'text',
                          data: {
                            content: 'Lorem ipsum'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            };
          default:
            throw new Error();
        }
      case 'demoshop2':
        switch (values.pageId) {
          case 'homepage':
            return {
              rows: [
                {
                  columns: [
                    {
                      elements: [
                        {
                          id: 'plugin1',
                          type: 'text',
                          data: {
                            content: 'Lorem ipsum'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            };
          default:
            throw new Error();
        }
      default:
        throw new Error();
    }
  });

  console.log(method + ' ' + url, payload);
  return new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      try {
        var result = router.handle(method, url, payload);
        if (result) {
          resolve(result);
        } else {
          reject('Not found');
        }
      } catch (ex) {
        reject('Internal server error');
      }
    }, 100);
  });
};
