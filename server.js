const sqlite3 = require("sqlite3");
const express = require("express");
const { response } = require("express");
const app = express();
const port = 3000;

let db = new sqlite3.Database(
    "photoviewer.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database.");
    }
);

app.get("/", (req, res) => {
    let response = "";

    let sql = `SELECT *
               FROM years`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            db.close();
            res.send("There was an error");
            throw err;
        }
        response = JSON.stringify(rows);
        res.send(response);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//db.close();
