const express = require('express')
const routes = require('./routes')

//Constants
const PORT = 3333

let app = express()
routes(app, express)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})


