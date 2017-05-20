
// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

var port = 8080
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve multiple static assets
// http://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
app.use(express.static(path.resolve(__dirname, '../project-fluffypurrkins/src/Client/Build')));
app.use('/stuff/public', express.static(path.resolve(__dirname, '../some_forms/public')));
// Always return the main index.html, so react-router render the route in the client
app.get(['/', '/about', '/cv', '/contact'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../project-fluffypurrkins/src/Client/Build', 'index.html'));
});

app.get('/stuff/:project', (req, res) => {
  switch (req.params.project) {
    case 'r2r':
      res.sendFile(path.resolve(__dirname, '../some_forms', 'index.html'));
      break
    case 'r2r-b':
      res.sendFile(path.resolve(__dirname, '../some_forms', 'index-B.html'));
      break
    default:
      res.sendFile(path.resolve(__dirname, './', 'NotFound.html'));
      break
  }
});

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname, './', 'NotFound.html'));
});

app.listen(port, function()
{
  console.log('Server running on port: '+port);
})
