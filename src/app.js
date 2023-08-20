import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsHandler from "./middlewares/errorsHandler.js";

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database connection successful");
});

const app = express();
routes(app);

app.use(errorsHandler);

export default app;