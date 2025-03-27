import express from 'express'
import cors from 'cors'
import { getNote, getNotes, createLogin, getPassword } from './server.js'

const app = express()
app.use(cors()); 
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

app.post("/find_account", async (req, res) => {
    const { username, password } = req.body;
    const result = await getPassword(username)
    console.log("result: " + result)
    if (password == result) {
        res.send("1")
    }
})


app.post("/notes", async (req, res) => {
    const { username, pword} = req.body
    const note = await createLogin(username, pword)
    res.status(201).send(note)
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Issue with login handler")
})

app.listen(35377, () => {
    console.log('Server running on port 35377');
});
