import express from 'express'
import cors from 'cors'
import { getNote, getNotes, createLogin, getPassword } from './server.js'

const app = express()
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json())

app.get("/api/notes/:id", async (req, res) =>  {
    const id = req.params.id
    const notes = await getNote(id)
    res.send(notes)
})

app.post("/api/find_account", async (req, res) => {
    const { username, password } = req.body;
    const result = await getPassword(username)
    console.log("result: " + result)
    if (password == result) {
        res.send("1")
    }
})

app.post("/api/create_login", async (req, res) => {
    try {
        const { username, pword } = req.body;
        const note = await createLogin(username, pword);
        res.status(201).send({ message: "User created", id: note });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).send({ error: "Database error" });
    }
});

app.get("/api/notes", async (req, res) => {
    const result = await getNotes();
    res.send(result)
})

app.get("/api/test", (req, res) => {
    console.log("test");
    res.json({ message: "API is working!!!" });
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Issue with login handler")
})

export default app;
