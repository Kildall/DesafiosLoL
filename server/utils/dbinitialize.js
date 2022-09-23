const db = require('./dbconnection');

const initialize = async () => {
    await db.run(`CREATE TABLE IF NOT EXISTS challenges (id, name, description, status)`);
}

module.exports = initialize