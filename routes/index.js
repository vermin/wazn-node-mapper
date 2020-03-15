// Copyright (c) 2020 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

const express = require('express')
const router = express.Router()
const db = require('../utils/knex')

router.get('/peers', async function (req, res, next) {
  try {
    let getNodes = db('nodes').select()

    let dataSet = []
    getNodes.map(async node => {
      let data = {
        node: node.address,
        peers: []
      }

      let getPeers = await db('links')
        .join('nodes', 'links.to', 'nodes.id')
        .select('nodes.address')
        .where('links.from', '=', node.id)

      getPeers.map(async peer => {
        data.peers.push(peer.address)
      })

      dataSet.push(data)
    })

    setTimeout(function () {
      res.status(200).json(dataSet)
    }, 2000)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

module.exports = router
