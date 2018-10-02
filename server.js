// server/app.js
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const subdomain = require('express-subdomain')

const app = express()
// .use(subdomain('blog', express.static('/var/www/blog/_site/index.html')));

var port = 8080
// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
)

// Serve multiple static assets
// http://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
app.use(express.static('/var/www/starcat.xyz/Build'))

// Always return the main index.html, so react-router render the route in the client
app.get(['/', '/about', '/cv', '/contact'], (req, res) => {
  res.sendFile('/var/www/starcat.xyz/Build/index.html')
})

app.use('/slides', express.static(path.resolve(__dirname, '../freelance_presentation')))
app.get('/slides/freelancing', (req, res) => {
  res.sendFile('/var/www/freelance_presentation/index.html')
})

app.get('/slides/freelancing/card_index.html', (req, res) => {
  res.sendFile('/var/www/freelance_presentation/cards.html')
})

app.get('/slides/freelancing/:card', (req, res) => {
  res.sendFile('/var/www/freelance_presentation/' + req.params["card"])
})


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './', 'NotFound.html'))
})

app.listen(port, function() {
  console.log('Server running on port: ' + port)
})
