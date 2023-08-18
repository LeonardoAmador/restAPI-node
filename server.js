import "dotenv/config.js";
import app from "./src/app.js";

const host = "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server is runnig on http://${host}:${port}`);
});