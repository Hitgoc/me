const express = require("express");
const { router } = require("../routes/routes");
const app = express();
const path = require("path");
const cors = require("cors");
require("../database/database");

const staticPath = path.resolve(__dirname, "../../../build");

app.use(express.static(staticPath));

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", router);

app.use((req, res, next) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Me app 2022 server running.../");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
