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
    min: 10,
    max: 5000 
  },
}
);

const books = mongoose.model("books", schemaBook);

export default books;