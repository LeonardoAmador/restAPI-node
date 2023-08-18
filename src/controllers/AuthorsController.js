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

  static listAuthorById = async (req, res) => {
    const id = req.params.id;

    try {
      const authorFound = await authors.findById(id);
      res.status(200).send(authorFound);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  static registerAuthor = async (req, res) => {
    try {
      const author = new authors(req.body);
      const savedAuthor = await author.save();

      if (!savedAuthor) {
        res.status(500).send({ message: "Failed to save author." });
      } 

      res.status(201).send(author.toJSON());
    
    } catch (error) {
      res.status(500).send({ message: `${error.message} - failed to register author.` });
    }
  };

  static updateAuthor = async (req, res) => {
    const id = req.params.id;

    try {
      const updatedAuthor = await authors.findByIdAndUpdate(id, { $set: req.body });

      if (!updatedAuthor) {
        return res.status(404).send({ message: "Author not found." });
      }

      res.status(200).send({ message: "Author updated successfully", updatedAuthor: updatedAuthor });
    } catch (error) {
      res.status(500).send({ message: "An error occurred while updating the author.", error: error.message });
    }
  };

  static deleteAuthor = async (req, res) => {
    const id = req.params.id;

    try {
      const deletedAuthor = await authors.findByIdAndDelete(id);

      if (!deletedAuthor) {
        res.status(404).send({ message: `Author ${id} not found.` });
      }

      res.status(200).send({ message: "Author removed successfully" });
    } catch (error) {
      res.status(500).send({ message: `${error.message} - failed to remove author` }); 
    }
  };
}

export default AuthorsController;
