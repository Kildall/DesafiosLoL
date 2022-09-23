const schedule = require('node-schedule');
const db = require('./dbconnection')


module.exports = schedule.scheduleJob({hour: 6}, async () => {
    let challenges = []
    const data = await got('https://la2.api.riotgames.com/lol/challenges/v1/challenges/config', options).json()
    
    const query = db.prepare('INSERT INTO challenge VALUES (@id, @name, @description, @short_description, @state, @leaderboard)');

    const insert = db.transaction((challenges) => {
        for (const challenge of challenges) query.run(challenge);
      });
});