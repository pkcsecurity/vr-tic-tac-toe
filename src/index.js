const express = require("express");
const path = require("path");
const app = express();
const logger = require("morgan");
const port = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`App listening on port ${port}!`));
