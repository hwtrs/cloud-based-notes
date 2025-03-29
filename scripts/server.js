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
        rejectUnauthorized: true
    }
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
    return rows[0].password
}

export async function createLogin(username, pword) {
    const [result] = await pool.query('INSERT INTO logins (username, password) VALUES (?, ?)', [username, pword])
    return result.insertId
}