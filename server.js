const sqlite3 = require("sqlite3");
var app = require("express")();
const port = 3001;

let config = { "Access-Control-Allow-Origin": "*" };

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

app.get("/years", (req, res) => {
    let sql = `SELECT *
               FROM years`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        res.header(config);
        res.json(rows);
    });
});

app.get("/albums/:year", (req, res) => {
    let sql = `SELECT *
               FROM albums
               WHERE year = '${req.params.year}'`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        res.header(config);
        res.json(rows);
    });
});

app.get("/photos/:album", (req, res) => {
    let sql = `SELECT *
               FROM photos
               WHERE album = '${req.params.album}'`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        res.header(config);
        //console.log(rows);
        res.json(rows);
    });
});

app.get("/photo/:photoid", (req, res) => {
    let sql = `SELECT photo_path
               FROM photos
               WHERE id = '${req.params.photoid}'`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }
        //console.log(rows);
        if (rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.header(config);
            res.sendFile(rows[0]["photo_path"], { root: __dirname });
        }
    });
});

app.get("/comments/:photoid", (req, res) => {
    let sql = `SELECT c.id,
                comment,
                name authorName,
                c.createdDate date
               FROM comments c
                JOIN users u ON c.author = u.id
               WHERE c.photo = '${req.params.photoid}'`;
    db.all(sql, [], (err, rows) => {
        res.header(config);

        if (err) {
            res.send("There was an error");
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//db.close();