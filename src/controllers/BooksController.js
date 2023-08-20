import books from "../models/Book.js";

class BooksController {
  static listBook = async (req, res) => {
    try {
      const searchedBooks = await books.find().populate("author").exec();
      res.status(200).json(searchedBooks);
    } catch (error) {
      console.log("Error fetching books: ", error);
      res.status(500).json({ error: "Internal error." });
    }
  };

  static listBookById = async (req, res) => {
    const id = req.params.id;

    try {
      const bookList = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(bookList);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  static registerBook = async (req, res) => {
    const book = new books(req.body);

    try {
      const savedBook = await book.save();

      res.status(201).send(savedBook.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - failed to register book.` });
    }
  };

  static updateBook = async (req, res) => {
    const id = req.params.id;

    try {
      await books.findByIdAndUpdate(id, { $set: req.body });

      res.send(200).send({ message: "Book updated successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static deleteBook = async (req, res) => {
    const id = req.params.id;

    try {
      await books.findByIdAndDelete(id);
      res.status(200).send({ message: "Book removed successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listBookByPublisher = async (req, res) => {
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
      res.status(500).send({ message: "Error searching the database" });
    }
  };
}

export default BooksController;