const sqlite = require('sqlite3')

const DBSOURCE = process.env.DB_FILE || 'db.sqlite'

const db = new sqlite.Database(DBSOURCE, (err) => {
    if(err){
        console.error(err.message)
    } else {
        console.log(`Connected to DB of file ${DBSOURCE}`)
    }
})

module.exports = db