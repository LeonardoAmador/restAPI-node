import express from "express";
import AuthorsController from "../controllers/AuthorsController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorsController.listAuthors, pagination)
  .get("/authors/:id", AuthorsController.listAuthorById)
  .post("/authors", AuthorsController.registerAuthor)
  .put("/authors/:id", AuthorsController.updateAuthor)
  .delete("/authors/:id", AuthorsController.deleteAuthor);

export default router;
