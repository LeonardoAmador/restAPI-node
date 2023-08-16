import mongoose from "mongoose";

const schemaBook = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  pagesNumber: { type: Number },
});

const books = mongoose.model('books', schemaBook);

export default books;