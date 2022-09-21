'use strict'
const got = require('got');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const dataArgentina = {}
    const data = await got('https://la2.api.riotgames.com/lol/challenges/v1/challenges/config?api_key=').json() 
    return data;
  })
}
