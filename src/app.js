import express from "express";

const app = express();

app.use(express.json());

const books = [
  { id: 1, "title": "Senhor dos Aneis" },
  { id: 2, "title": "O Hobiit" },
];

app.get("/", (req, res) => {
    res.status(200).send('Node express server.');
});

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  let index = searchBook(req.params.id);
  res.json(books[index]);
});

app.post('/books', (req, res) => {
  books.push(req.body);
  res.status(201).send('Book registered successfully')
});

app.put('/books/:id', (req, res) => {
  let index = searchBook(req.params.id);
  
  index !== -1
    ? (books[index].title = req.body.title, res.json(books))
    : res.status(404).send('Book not found');
});

app.delete('/books/:id', (req, res) => {
  let { id } = req.params;
  let index = searchBook(id);
  books.splice(index, 1);
  res.send(`Book ${id} removed successfully`);
});

const searchBook = (id) => books.findIndex(book => book.id === parseInt(id));

export default app;