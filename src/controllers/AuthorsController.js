import authors from "../models/Author.js";

class AuthorsController {
  static listAuthors = async (req, res) => {
    try {
      const searchedAuthors = await authors.find();
      res.status(200).json(searchedAuthors);
    } catch (error) {
      console.log("Error fetching authors: ", error);
      res.status(500).json({ error: "Error getting author." });
    }
  };

  static listAuthorById = (req, res) => {
    const id = req.params.id;

    authors.findById(id, (error, author) => {
      error
        ? res.status(400).send({ message: error.message })
        : res.status(200).send(author);
    });
  };

  static registerAuthor = (req, res) => {
    let author = new authors(req.body);

    author.save((error) => {
      if (error) {
        res
          .status(500)
          .send({ message: `${error.message} - failed to register author.` });
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  };

  static updateAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndUpdate(id, { $set: req.body }, (error) => {
      if (!error) {
        res.status(200).send({ message: "Authors updated successfully" });
      } else {
        res.status(500).send({ message: error.message });
      }
    });
  };

  static deleteAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndDelete(id, (error, deletedAuthor) => {
      if (error) {
        res.status(500).send({ message: error.message });
      } else if (!deletedAuthor) {
        res.status(404).send({ message: `Author ${id} not found.` });
      } else {
        res.status(200).send({ message: "Author removed successfully" });
      }
    });
  };
}

export default AuthorsController;
