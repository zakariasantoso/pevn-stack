const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  res.send("Hello World! V2");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
