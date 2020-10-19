require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

const artistRoute = require("./routes/artistRoute");
const albumRoute = require("./routes/albumRoute");
const trackRoute = require("./routes/trackRoute");
const genreRoute = require("./routes/genreRoute");

app.use("/api", artistRoute);
app.use("/api", albumRoute);
app.use("/api", trackRoute);
app.use("/api", genreRoute);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
