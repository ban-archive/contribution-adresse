const express = require('express')

const app = express()

app.use('/dist', express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/front/public'))

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/front/public/index.html')
})

const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log('Start listening on port ' + port)
})
