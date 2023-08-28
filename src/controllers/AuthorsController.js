import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";
class AuthorsController {
  static listAuthors = async (req, res, next) => {
    try {
      const searchedAuthors = authors.find();

      req.result = searchedAuthors;
      
      next();
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
        : next(new NotFound(`Author id ${id} not found`));
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

      if (updatedAuthor !== null) {
        res.status(200).send({
          message: "Author updated successfully",
          updatedAuthor: updatedAuthor,
        });
      } else {
        next(new NotFound("Author id not found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const deletedAuthor = await authors.findByIdAndDelete(id);

      if (deletedAuthor !== null) {
        res.status(200).send({ message: "Author removed successfully" });
      } else {
        next(new NotFound("Author id not found"));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorsController;