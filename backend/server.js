const express = require("express");
const cors = require("cors");
const bookmarkRoutes = require("./routes/bookmarkRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookmarks", bookmarkRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});