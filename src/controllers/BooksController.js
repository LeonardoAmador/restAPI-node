import books from "../models/Book.js";

class BooksController {
  static listBook = async (req, res) => {
    try {
      const searchedBooks = await books.find();
      res.status(200).json(searchedBooks);
    } catch (error) {
      console.log("Error fetching books: ", error);
      res.status(500).json({ error: "Error getting book." });
    }
  };

  static listBookById = (req, res) => {
    const id = req.params.id;

    books.findById(id, (error, books) => {
      error
        ? res.status(400).send({ message: error.message })
        : res.status(200).send(books);
    });
  };

  static registerBook = (req, res) => {
    let book = new books(req.body);

    book.save((error) => {
      if (error) {
        res
          .status(500)
          .send({ message: `${error.message} - failed to register book.` });
      } else {
        res.status(201).send(book.toJSON());
      }
    });
  };

  static updateBook = (req, res) => {
    const id = req.params.id;

    books.findByIdAndUpdate(id, { $set: req.body }, (error) => {
      if (!error) {
        res.status(200).send({ message: "Book updated successfully" });
      } else {
        res.status(500).send({ message: error.message });
      }
    });
  };

  static deleteBook = (req, res) => {
    const id = req.params.id;

    books.findByIdAndDelete(id, (error) => {
      error
        ? res.status(500).send({ message: error.message })
        : res.status(200).send({ message: "Book removed successfully" });
    });
  };
}

export default BooksController;
