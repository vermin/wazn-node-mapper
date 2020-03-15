// Copyright (c) 2019 WAZN Project
// Copyright (c) 2018-2019, Fexra, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
'use strict'

const db = require('../utils/knex')
class DB {
  constructor (opts) {
    opts = opts || {}
  }

  async fetchNodes (cutoff) {
    try {
      let getNodes

      if (!cutoff) {
        getNodes = await db('nodes').select()
      } else {
        getNodes = await db('nodes')
          .select()
          .where('seen', '<', cutoff)
      }

      console.log('[fetch] ' + getNodes.length)
      return getNodes
    } catch (err) {
      console.error('[fetch] ' + err.message)
      return []
    }
  }

  async insertNode (nodeAddress) {
    try {
      let checkNode = await db('nodes')
        .count('id as count')
        .where('address', nodeAddress)
        .limit(1)

      if (checkNode[0].count <= 0) {
        await db('nodes')
          .insert({
            address: nodeAddress,
            available: true,
            seen: Date.now(),
            updated: Date.now(),
            created: Date.now()
          })

        console.log('[node] inserted - ' + nodeAddress)
      } else {
        await db('nodes').update({
          seen: Date.now()
        })
          .where('address', nodeAddress)
          .limit(1)

        console.log('[node] updated - ' + nodeAddress)
      }

      /// sqlite does not support returning?
      let nodeId = await db('nodes')
        .select('id')
        .where('address', nodeAddress)
        .limit(1)

      return nodeId[0].id
    } catch (err) {
      console.error('[node] ' + err.message)
      return 0
    }
  }

  async updateNodeGeo (nodeAddress, nodeGeo) {
    try {
      console.log('[node] geo - ' + nodeAddress)

      return await db('nodes').update({
        country: nodeGeo.country,
        region: nodeGeo.region,
        city: nodeGeo.city,
        coordinates: nodeGeo.ll,
        updated: Date.now()
      })
        .where('address', nodeAddress)
        .limit(1)
    } catch (err) {
      console.log('[node] ' + err.message)
    }
  }

  async updateNodeAvailability (nodeAddress, available) {
    try {
      console.log('[node] available - ' + nodeAddress)

      return await db('nodes').update({
        available: available,
        updated: Date.now()
      })
        .where('address', nodeAddress)
        .limit(1)
    } catch (err) {
      console.error('[node] ' + err.message)
    }
  }

  async insertLink (nodeFrom, nodeTo) {
    try {
      let checkLink = await db('links')
        .select('id')
        .where('from', nodeFrom)
        .andWhere('to', nodeTo)
        .limit(1)

      if (checkLink.length <= 0) {
        console.log('[link] inserted - ' + nodeFrom + ' to ' + nodeTo)

        return await db('links').insert({
          from: nodeFrom,
          to: nodeTo
        })
      } else {
        console.log('[link] updated - ' + nodeFrom + ' to ' + nodeTo)

        return await db('links').update({
          seen: Date.now()
        })
          .where('id', checkLink[0].id)
          .limit(1)
      }
    } catch (err) {
      console.error('[link] ' + err.message)
    }
  }
}

module.exports = DB
