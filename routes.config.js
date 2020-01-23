exports.routesConfig = function (app) {
  const middleware = require('./get-info-middleware');
  app.post('/turn', [
      middleware.getInfoMiddleware
  ]);
};
