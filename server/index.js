const express = require("express");
const app = express();
const PORT = 3000;
const createEmployeeTable = require("./db/EmployeeStorage");

app.get("/", async (req, res) => {
  res.send("Hello World! V2");
});

app.listen(PORT, async () => {
  try {
    await createEmployeeTable();
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
