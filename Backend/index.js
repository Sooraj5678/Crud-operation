const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const con = require("./Config");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.get("/api/users", async (req, res) => {
  try {
    const [rows, fields] = await con.query('SELECT * FROM users'); 

    res.json(rows);
  } catch (error) {
    console.log('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/users", (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  const query = "INSERT INTO crud (name, email, course) VALUES (?, ?, ?)";
  con.query(query, [name, email, course], (err, result) => {
    if (err) {
      console.log('Error inserting data:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    }
  });
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

module.exports = app;
