import express from "express";

const app = express();

const books = [
  { id: 1, title: "Senhor dos Aneis" },
  { id: 2, title: "O Hobiit" },
];

app.get("/", (req, res) => {
    res.status(200).send('Node express server.');
});

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

export default app;