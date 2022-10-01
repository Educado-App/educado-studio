const mongoose = require('mongoose')

let connection, db

export default async function makeDb() {
    connection =
        connection ||
        (await mongoose.connect(
            global.__MONGO_URI__,
            { useNewUrlParser: true }
        ))
    db = db || (await connection.db(global.__MONGO_DB_NAME__))

    return db
}