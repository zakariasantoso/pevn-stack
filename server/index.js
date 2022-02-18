const express = require("express");
const app = express();
const PORT = 3000;
const createEmployeeTable = require("./db/EmployeeStorage");
const db = require("./db/index");

app.get("/", async (req, res) => {
  res.send("Hello World! V2");
});

app.get("/api/employees", async (req, res, next) => {
  try {
    let sql = "SELECT * FROM employees";
    let results = await (await db.query(sql)).rows;
    res.send(results);
  } catch (error) {
    console.log(error);
    next(error); // pass error to express error handler
  }
});

app.listen(PORT, async () => {
  try {
    await createEmployeeTable();
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
