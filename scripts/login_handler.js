import express from 'express'
import cors from 'cors'
import { getNote, getNotes, createLogin, getPassword, getUserID } from './server.js'

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
        const user_id = await getUserID(username);
        res.json({ message: "Login successful", user_id })
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

app.post("/api/create_note", async (req, res) => {
    try {
        const { user_id, title, contents } = req.body;
        const note = await createNote(user_id, title, contents);
        res.status(201).send({ message: "Note created", id: note });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).send({ error: "Database error" });
    }
});

app.post("/api/notes", async (req, res) => {
    const { user_id } = req.body
    const result = await getNotes(user_id);
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
