import app from "../server.js";
import { createServer } from "@vercel/node";

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

export default app;