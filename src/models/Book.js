import mongoose from "mongoose";

const schemaBook = new mongoose.Schema({
  id: { type: String },
  title: { 
    type: String, 
    required: [true, "The book title is required"] 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors", 
    required: [true, "The author is required"] 
  },
  publisher: { 
    type: String, 
    required: [true, "The publisher is required"],
  },
  pagesNumber: { 
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: "The page numbers must be between 10 and 5000. Provided values: {VALUE}"
    }
  },
}
);

const books = mongoose.model("books", schemaBook);

export default books;