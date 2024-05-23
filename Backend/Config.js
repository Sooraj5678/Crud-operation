const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  passowrd: "",
  database: "crud",
});

con.connect((err) => {
  if (err) {
    console.error("error connecting to the data base:", err.stack);
    return;
  }
  console.log("connected to the databse.");
});

module.exports = con;
