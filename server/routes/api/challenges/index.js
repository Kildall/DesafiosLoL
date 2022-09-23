'use strict'
const got = require('got');
const db = require('../../../utils/dbconnection')
const initialize = require('../../../utils/dbinitialize')

const ENV = process.env.NODE_ENV || 'dev'

module.exports = async function (fastify, opts) {
    const { notFound } = fastify.httpErrors

    const options = {
        headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY
        }
    };

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

    
    fastify.get('/', async function (request, reply) {
        await initialize()
        let challenges = []
        const data = await got('https://la2.api.riotgames.com/lol/challenges/v1/challenges/config', options).json()
        data.forEach((challenge) => {
            challenge.localizedNames = challenge.localizedNames.es_AR
            challenges.push(challenge)
        })
        return challenges;
    })
    

    fastify.get('/:id', idSchema, async function (request, reply) {
        const  { id } =  request.params;
        
        let query = db.prepare(`SELECT * FROM challenges WHERE id=${id}`);
        let data = query.get()
        if(data) return data

        try {
            let retrieved = await got(`https://la2.api.riotgames.com/lol/challenges/v1/challenges/${id}/config`, options).json()
            retrieved.localizedNames = retrieved.localizedNames.es_AR
            db.prepare('INSERT INTO challenges VALUES (?,?,?,?,?,?)').run(retrieved.id, retrieved.localizedNames.name, 
                retrieved.localizedNames.description, retrieved.localizedNames.shortDescription,
                retrieved.state, retrieved.leaderboard ? 1 : 0)
            data = query.get()
            return data
        } catch (err) {
            console.error(err)
            return notFound
        }
    })
}