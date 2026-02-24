const express = require("express");
const cors = require("cors");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookmarks", bookmarkRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});