// Copyright (c) 2020 WAZN Project
// Copyright (c) 2018, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

// Set Express App
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Helmet = require('helmet')
const Compression = require('compression')
const logger = require('morgan')

// Compress
app.use(Helmet())
app.use(Compression())

// Set Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

// Set Schema
require('./utils/schema')

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
const index = require('./routes/index')

app.use('/', index)

// Load script

setTimeout(function () {
  require('./scripts/main')
}, 1000)

// error handler
app.use(function onError (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = process.env.DEBUG == true ? err : {}
  res.statusCode = err.status || 500
  res.status(500).json(err)
})

module.exports = app
