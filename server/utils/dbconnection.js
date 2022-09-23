const Database = require('better-sqlite3')

const DBSOURCE = process.env.DB_FILE || 'db.sqlite'

const db = new Database(DBSOURCE, {})

module.exports = db