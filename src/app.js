import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import handler404 from "./middlewares/404Handler.js";

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database connection successful");
});

const app = express();
routes(app);

app.use(handler404);

app.use(errorsHandler);

export default app;