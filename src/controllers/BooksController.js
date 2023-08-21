import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";

class BooksController {
  static listBook = async (req, res, next) => {
    try {
      const searchedBooks = await books.find().populate("author").exec();
      res.status(200).json(searchedBooks);
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

  static listBookByPublisher = async (req, res, next) => {
    const publisher = req.query.publisher;

    if (!publisher) {
      return res
        .status(400)
        .send({ message: "The 'publisher' param is required" });
    }

    try {
      const bookList = await books.find({ publisher: publisher });

      if (bookList.length === 0) {
        return res.status(404).send({ message: "Book not found" });
      }

      res.status(200).send(bookList);
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;