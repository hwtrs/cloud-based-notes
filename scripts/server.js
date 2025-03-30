import mysql from 'mysql2'
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve('scripts', '.env') });

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 37199,
    ssl: {
        rejectUnauthorized: false
    }
}).promise()


export async function getNotes(id) {
    const [rows]  = await pool.query("SELECT * FROM notes WHERE user_id = ?", [id]);
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id])
    return rows[0]
}
 
export async function getPassword(name) {
    const [rows] = await pool.query("SELECT * FROM logins where username = ?", [name])
    return rows[0].password
}

export async function getUserID(name) {
    const [rows] = await pool.query("SELECT * FROM logins where username = ?", [name])
    return rows[0].id
}

export async function createLogin(username, pword) {
    const [result] = await pool.query('INSERT INTO logins (username, password) VALUES (?, ?)', [username, pword])
    return result.insertId
}

export async function createNote(user_id, title, contents) {
    const [result] = await pool.query('INSERT INTO notes (user_id, title, contents) VALUES (?, ?, ?)', [user_id, title, contents])
    return result.insertId
}

export async function saveNote(id, user_id, title, contents) {
    const [result] = await pool.query('UPDATE notes SET title = ?, contents = ? WHERE id = ?', [title, contents, id])
    return result.affectedRows
}