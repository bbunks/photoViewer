const bcrypt = require("bcrypt");
const saltRounds = 10;

const sqlite3 = require("sqlite3");
var app = require("express")();
const port = 3001;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());

let config = { "Access-Control-Allow-Origin": "*" };
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

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

app.post("/login", (req, res) => {
    let sql = `SELECT id, email, password
    FROM users
    WHERE email = ?`;

    let insert = `UPDATE users
    SET JWTToken = ?
    WHERE id = ?`;

    res.header(config);

    db.all(sql, [req.body.email], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        if (rows.length > 0) {
            bcrypt.compare(req.body.password, rows[0]["password"], function (
                err,
                result
            ) {
                if (result) {
                    let token = jwt.sign(
                        {
                            email: rows[0]["email"],
                        },
                        "testSecret",
                        { expiresIn: "3h" }
                    );

                    //update JWT in database
                    res.json(token);
                    db.all(insert, [token, rows[0]["id"]], (err, rows) => {
                        if (err) console.log(err);
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });

    //bcrypt.hash("TestPassword", saltRounds, function (err, hash) {
    //    // Store hash in your password DB.
    //    console.log(hash);
    //
});

app.get("/years", authorizeToken, (req, res) => {
    let sql = `SELECT *
               FROM years`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        res.json(rows);
    });
});

app.get("/albums/:year", authorizeToken, (req, res) => {
    let sql = `SELECT *
               FROM albums
               WHERE year = ?`;
    db.all(sql, [req.params.year], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }

        res.json(rows);
    });
});

app.get("/photos/:album", authorizeToken, (req, res) => {
    let sql = `SELECT *
               FROM photos
               WHERE album = ?`;

    db.all(sql, [req.params.album], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }
        //console.log(rows);
        res.json(rows);
    });
});

app.get("/photo/:photoid", authorizeToken, (req, res) => {
    let sql = `SELECT photo_path
               FROM photos
               WHERE id = ?`;

    db.all(sql, [req.params.photoid], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }
        //console.log(rows);
        if (rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.sendFile(rows[0]["photo_path"], { root: __dirname });
        }
    });
});

app.get("/comments/:photoid", authorizeToken, (req, res) => {
    let sql = `SELECT c.id,
                comment,
                name authorName,
                c.createdDate date
               FROM comments c
                JOIN users u ON c.author = u.id
               WHERE c.photo = ?`;
    db.all(sql, [req.params.photoid], (err, rows) => {
        if (err) {
            res.send("There was an error");
            throw err;
        }
        res.json(rows);
    });
});

app.post("/comments/:photoid", authorizeToken, (req, res) => {
    res.header(config);

    let authToken = "";

    if (req.query.authorization !== undefined) {
        authToken = req.query.authorization;
        //console.log("Writing from Query");
    } else {
        authToken = req.headers.authorization;
        //console.log("Writing from Header");
    }

    let token = jwt.decode(authToken.substring(7));

    let sql = `SELECT id, email, password
                FROM users
                WHERE email = ?`;

    let insertComment = `INSERT INTO comments (author, comment, photo, createdDate)
                            VALUES (?, ?, ?, ?)`;

    db.all(sql, [token.email], (err, rows) => {
        if (err || rows.length === 0) {
            res.sendStatus(500);
            throw err;
        } else {
            let row = {
                photoid: req.params.photoid,
                //email: token.email,
                userid: rows[0].id,
                comment: req.body.comment,
                createdDate: new Date().toISOString(),
            };

            db.all(
                insertComment,
                [row.userid, row.comment, row.photoid, row.createdDate],
                (err, rows) => {
                    if (err) console.log(err);
                }
            );

            res.sendStatus(201);
        }
    });
    //db.all(sql, [req.params.photoid], (err, rows) => {
    //    res.header(config);
    //
    //    if (err) {
    //        res.send("There was an error");
    //        throw err;
    //    }
    //    res.json(rows);
    //});
});

function authorizeToken(req, res, next) {
    let sql = `SELECT *
    FROM users
    WHERE email = ?`;

    try {
        let authToken = "";

        if (req.query.authorization !== undefined) {
            authToken = req.query.authorization;
            //console.log("Writing from Query");
        } else {
            authToken = req.headers.authorization;
            //console.log("Writing from Header");
        }

        //console.log(authToken);
        let token = jwt.verify(authToken.substring(7), "testSecret");

        db.all(sql, [token.email], (err, rows) => {
            if (authToken.substring(7) === rows[0]["JWTToken"]) {
                next();
            } else {
                console.log("Tokens do not match");
                res.sendStatus(403);
            }
        });
    } catch {
        console.log("Invalid Token");
        res.sendStatus(403);
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//db.close();
