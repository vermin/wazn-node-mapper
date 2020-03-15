// Copyright (c) 2019 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

'use strict'

const cron = require('node-cron')
const DB = require('../lib/db')
const Network = require('../lib/network')

const db = new DB()
const network = new Network()

// look for new nodes and peers every hour
cron.schedule(process.env.CRON_MAP || '1 * * * *', async () => {
  // insert seed node - it has to start somewhere
  let seedNode = '45.76.193.160:11786'
  let checkSeed = await db.fetchNodes()

  if (checkSeed.length <= 0) {
    await db.insertNode(seedNode)
  }

  // Get all stored nodes that have been last seen 24 hours +
  let storedNodes = await db.fetchNodes()

  // collect peer node for each stored node
  storedNodes.map(async node => {
    let peerNodes = await network.getPeers(node.address)

    // if not peer list, no connection
    if (peerNodes.length <= 0) {
      await db.updateNodeAvailability(node.address, false)
    } else {
      await db.updateNodeAvailability(node.address, true)

      // store/update & link/update 'em
      peerNodes.map(async nodeAddress => {
        let nodeId = await db.insertNode(nodeAddress)

        if (nodeId != 0) {
          await db.insertLink(node.id, nodeId)
        }
      })
    }
  })
})

// locate all nodes seen 24 hours or later
cron.schedule(process.env.CRON_LOCATE || '0 0 * * *', async () => {
  let newDate = new Date()
  let cutoff = newDate.setDate(newDate.getDate() - 1)
  let oldNodes = await db.fetchNodes(cutoff)

  oldNodes.map(async node => {
    let nodeGeo = await network.locateNode(node.address)
    await db.updateNodeGeo(node.address, nodeGeo)
    console.log('located node ' + node.address)
  })
})
