const express = require('express')
const port = 3000
const config = require('./config/config')
const database = require('./config/database.config')
let app = express()
let envirenment = process.env.NODE_ENV || 'development'

database(config[envirenment])
require('./config/express')(app, config[envirenment])
require('./config/routes')(app)

app.listen(port)


