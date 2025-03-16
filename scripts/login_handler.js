import express from 'express'

import { getNote, getNotes, createNote } from './server.js'

const app = express()

app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

app.use((err, req, res, next) => {
    console.err(err.stack)
    res.status(500).send("Issue with login handler")
})

app.listen(3000, () => {
    console.log("Server port: 3000")
})

/*
document.getElementById("login").addEventListener("click", function(event) {
    event.preventDefault();
});
*/