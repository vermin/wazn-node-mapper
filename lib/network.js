// Copyright (c) 2019 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

const axios = require('axios')
const geoip = require('geoip-lite')

class Network {
  constructor (opts) {
    opts = opts || {}
  }

  async getPeers (nodeAddress) {
    try {
      let nodeIP = nodeAddress.split(':')[0]
      let nodePort = +nodeAddress.split(':')[1] + 1
      let getNode = await axios.get('http://' + nodeIP + ':' + nodePort + '/getpeers')
      return getNode.data.peers
    } catch (err) {
      console.error('[node] - ' + err.message)
      return []
    }
  }

  async locateNode (nodeAddress) {
    try {
      let nodeIP = nodeAddress.split(':')[0]
      let nodeGeo = await geoip.lookup(nodeIP)
      return nodeGeo
    } catch (err) {
      console.error('[node] - ' + err.message)
      return []
    }
  }
}

module.exports = Network
