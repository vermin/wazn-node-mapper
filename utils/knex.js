// Copyright (c) 2019 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

const knex = module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './cache.sqlite'
  },
  useNullAsDefault: true, // sqlite3 - defaults not supported
  propagateCreateError: false, // sqlite3 - automatically reconnect
  pool: { min: 1, max: 1 }, // sqlite3 - io: 1:1
  timeout: 120000
})

module.exports = knex
