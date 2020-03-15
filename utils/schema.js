// Copyright (c) 2019 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

const db = require('../utils/knex')

// Create 'nodes' table if it does not exist
db.schema.hasTable('nodes').then(function (exists) {
  if (!exists) {
    return db.schema.createTable('nodes', function (table) {
      table.increments()
      table.unique('address')
      table.string('address')
      table.string('country')
      table.string('region')
      table.string('city')
      table.jsonb('coordinates')
      table.int('available')
      table.bigint('seen')
      table.bigint('updated')
      table.bigint('created')
    })
  }
})

// Create 'links' table if it does not exist
db.schema.hasTable('links').then(function (exists) {
  if (!exists) {
    return db.schema.createTable('links', function (table) {
      table.increments()
      table.int('from')
      table.int('to')
      table.bigint('seen')
    })
  }
})
