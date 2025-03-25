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
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id])
    return rows[0]
}
 
export async function getPassword(name) {
    const [rows] = await pool.query("SELECT * FROM logins where username = ?", [name])
    return rows[0].pword
}

export async function createLogin(username, pword) {
    const [result] = await pool.query('INSERT INTO logins (username, pword) VALUES (?, ?)', [username, pword])
    return result.insertId
}