import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'notes_app'
}).promise()


export async function getNotes() {
    const [rows]  = await pool.query("SELECT * FROM notes");
    console.log(rows)
}

export async function getNote(id) {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id])
    return rows[0]
}

export async function createNote(title, content) {
    const [result] = await pool.query('INSERT INTO notes (title, contents) VALUES (?, ?)', [title, content])
    return result.insertId
}

//const result = await createNote('test', 'test')
console.log("here")
