import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BooksController {
  static listBook = async (req, res, next) => {
    try {
      const searchBooks = books.find();
      
      req.result = searchBooks;
      
      next();
    } catch (error) {
      next(error);
    }
  };

  static listBookById = async (req, res, next) => {
    const id = req.params.id;

    try {
      const bookList = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      if (bookList !== null) {
        res.status(200).send(bookList);
      } else {
        next(new NotFound("Book id not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static registerBook = async (req, res, next) => {
    const book = new books(req.body);

    try {
      const savedBook = await book.save();

      res.status(201).send(savedBook.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    const id = req.params.id;

    try {
      const updatedBook = await books.findByIdAndUpdate(id, { $set: req.body });

      if (updatedBook !== null) {
        res.send(200).send({ message: "Book updated successfully" });
      } else {
        next(new NotFound("Book id not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    const id = req.params.id;

    try {
      const deletedBook = await books.findByIdAndDelete(id);

      if (deletedBook !== null) {
        res.status(200).send({ message: "Book removed successfully" });
      } else {
        next(new NotFound("Book id not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static listBookByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);

      if (search !== null) {
        const bookList = books.find(search).populate("author");

        req.result = bookList;
        
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };
}

const processSearch = async (params) => {
  const { publisher, title, minPages, maxPages, authorName } = params;

  let search = {};

  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.pagesNumber = {};

  if (minPages) search.pagesNumber.$gte = minPages;
  if (maxPages) search.pagesNumber.$lte = maxPages;

  if (authorName) {
    const author = await authors.findOne({ name: authorName });

    if (author) {
      search.author = author._id;
    } else {
      search = null;
    }
  }

  return search;
};

export default BooksController;
