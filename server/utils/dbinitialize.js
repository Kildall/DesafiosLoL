const db = require('./dbconnection');

const initialize = async () => {
    const createChallenges = db.prepare(`CREATE TABLE IF NOT EXISTS challenges (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        short_description TEXT,
        state TEXT,
        leaderboard INTEGER
        )`).run();
    await db.prepare(`CREATE TABLE IF NOT EXISTS thresholds (
        id INTEGER PRIMARY KEY,
        IRON TEXT,
        BRONZE TEXT,
        SILVER TEXT,
        GOLD TEXT,
        PLATINUM TEXT,
        DIAMOND TEXT,
        MASTER TEXT,
        GRANDMASTER TEXT,
        CHALLENGER TEXT
        )`).run();
}

module.exports = initialize