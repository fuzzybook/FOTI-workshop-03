var express = require('express')
var app = express()

/* serves main page */
app.get('/', function (req, res) {
  res.json({ ok: true })
})

app.post('/', function (req, res) {
  let body = req.body
  res.json({ ok: true, body: body })
})

var port = 5000

app.listen(port, function () {
  console.log('Listening on ' + port)
})

//squync-front-dist/stage/dist
// /Users/fabio/CODE/SQUYNC/squync-frontend-dist/squync-front-dist/stage/dist
// /Users/fabio/CODE/SQUYNC/squync-frontend-dist/squync-front-dist/stage/dist/index.html