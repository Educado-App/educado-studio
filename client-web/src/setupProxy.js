// Manual proxy handling
// The file does not need to be imported anywhere. It is automatically registered when starting development server (express)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api','/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};