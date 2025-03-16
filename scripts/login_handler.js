import express from 'express'

import { getNote, getNotes, createNote } from './server.js'

const app = express()

app.use(express.json())

app.get("/notes", async (req, res) => {
    console.log("this")
    const notes = await getNotes()
    res.send(notes)
})

app.get("/notes/:id", async (req, res) =>  {
    const id = req.params.id
    const notes = await getNote(id)
    res.send(notes)
})


app.post("/notes", async (req, res) => {
    const { title, contents} = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Issue with login handler")
})

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});


/*
document.getElementById("login").addEventListener("click", function(event) {
    event.preventDefault();
});
*/