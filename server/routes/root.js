'use strict'
const got = require('got');
const db = require('../utils/dbconnection')
const initialize = require('../utils/dbinitialize')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {};
  })
}
