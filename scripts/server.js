import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'notes_app'
}).promise()


async function getNodes() {
    const [rows]  = await pool.query("SELECT * FROM notes");
    console.log(rows)
}

const notes = await getNodes()
console.log(notes)
