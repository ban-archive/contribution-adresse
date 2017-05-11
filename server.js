const express = require('express')

const app = express()

app.use('/dist', express.static(__dirname + '/front/dist'))
app.use(express.static(__dirname + '/front/public'))

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/front/public/index.html')
})

app.listen(5000)
