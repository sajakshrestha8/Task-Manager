const express = require("express");
const connection = require("./config/database/connection");
const Routes = require("./routes/index");
const app = express();
const PORT = 8000;
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());
app.use(Routes);

app.listen(PORT, () => {
  console.log("server is running in port: ", PORT);
});
