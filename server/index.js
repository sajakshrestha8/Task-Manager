const express = require("express");
const connection = require("./config/database/connection");
const Routes = require("./routes/index");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(Routes);

app.listen(PORT, () => {
  console.log("server is running in port: ", PORT);
});
