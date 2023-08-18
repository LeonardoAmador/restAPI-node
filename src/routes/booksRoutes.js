import express from "express";
import BooksController from "../controllers/BooksController.js";

const router = express.Router();

router
  .get("/books", BooksController.listBook)
  .get("/books/search", BooksController.listBookByPublisher)
  .get("/books/:id", BooksController.listBookById)
  .post("/books", BooksController.registerBook)
  .put("/books/:id", BooksController.updateBook)
  .delete("/books/:id", BooksController.deleteBook);

export default router;
