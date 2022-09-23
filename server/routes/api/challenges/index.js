'use strict'
const got = require('got');
const db = require('../../../utils/dbconnection')
const initialize = require('../../../utils/dbinitialize')

const ENV = process.env.NODE_ENV || 'dev'

module.exports = async function (fastify, opts) {
    const { notFound } = fastify.httpErrors

    const idSchema = {
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { 
                        type: 'integer',
                        minimum: 0,
                        maximum: 2147483647
                    }
                }
            }
        }
    }

    if(ENV === 'dev'){
        fastify.get('/', async function (request, reply) {
            await initialize()
            const data = await got('https://la2.api.riotgames.com/lol/challenges/v1/challenges/config').json()
            for (const challenge in data) {
            if (challenge.state !== 'ENABLED') {
                
            }
            }
            return {};
        })
    }

    fastify.get('/:id', idSchema, async function (request, reply) {
        const  { id } =  request.params.id;
        const options = {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY
            }
        };
        const retrieved = await got(`https://la2.api.riotgames.com/lol/challenges/v1/challenges/${id}/onfig`, options).json()
        
        return retrieved
    })
}