import mongoose from "mongoose";

mongoose.connect("mongodb+srv://amadorleonardo:masterkey@cluster0.5p0lmy2.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;