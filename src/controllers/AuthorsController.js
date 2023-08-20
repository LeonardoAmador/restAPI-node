import authors from "../models/Author.js";
class AuthorsController {
  static listAuthors = async (req, res) => {
    try {
      const searchedAuthors = await authors.find();
      res.status(200).json(searchedAuthors);
    } catch (error) {
      console.log("Error fetching authors: ", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  static listAuthorById = async (req, res, next) => {
    const id = req.params.id;

    try {
      const authorFound = await authors.findById(id);

      authorFound !== null
        ? res.status(200).send(authorFound)
        : res.status(404).send({ message: "Author id not found." });
    } catch (error) {
      next(error);
    }
  };

  static registerAuthor = async (req, res, next) => {
    try {
      const author = new authors(req.body);
      const savedAuthor = await author.save();

      if (!savedAuthor) {
        res.status(500).send({ message: "Failed to save author." });
      }

      res.status(201).send(author.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const updatedAuthor = await authors.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (!updatedAuthor) {
        return res.status(404).send({ message: "Author not found." });
      }

      res.status(200).send({
        message: "Author updated successfully",
        updatedAuthor: updatedAuthor,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const deletedAuthor = await authors.findByIdAndDelete(id);

      if (!deletedAuthor) {
        res.status(404).send({ message: `Author ${id} not found.` });
      }

      res.status(200).send({ message: "Author removed successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorsController;
