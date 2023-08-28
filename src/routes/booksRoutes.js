import express from "express";
import BooksController from "../controllers/BooksController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/books", BooksController.listBook, pagination)
  .get("/books/search", BooksController.listBookByFilter, pagination)
  .get("/books/:id", BooksController.listBookById)
  .post("/books", BooksController.registerBook)
  .put("/books/:id", BooksController.updateBook)
  .delete("/books/:id", BooksController.deleteBook);

export default router;
