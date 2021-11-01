const path = require("path");
const express = require("express");
// const proxy = require('express-http-proxy');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use(express.static(__dirname + '/angular-ui-20211031'));
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, 'angular-ui-20211031', 'index.html'))
});
// app.use('/api', proxy('https://rails-api-20211031.herokuapp.com'));
// app.use('/api', createProxyMiddleware({ target: 'https://rails-api-20211031.herokuapp.com', changeOrigin: true }));
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
