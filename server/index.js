const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

const server = http.createServer(app);

const dbPath = "./database.db";

app.use(bodyParser.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("error opening database:", err.message);
  } else {
    console.log("connecte to sqlite database");
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (data) => {
    socket.join(data.room);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.post("/checkifexists", (req, res) => {
  const query = "select * from users where username = ?";
  db.all(query, [req.body.username], (err, data) => {
    if (err) console.log(err);
    else if (data.length > 0) res.send({ message: "user exists", row: data });
    else res.send({ message: "user does not exist" });
  });
});

app.post("/sendRequests", (req, res) => {
  const query = "insert into friends(user1, user2, status) values(?,?,?)";
  db.run(
    query,
    [req.body.sender, req.body.reciever, req.body.status],
    (err) => {
      if (err) console.log(err);
      else res.send(`Friend Request sent to ${req.body.reciever}`);
    }
  );
});

app.get("/search", (req, res) => {
  const query = req.query.query;
  const username = req.query.username;

  db.all(
    `SELECT * from users WHERE username LIKE '%${query}%'`,
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        const friendshipPromises = [];

        rows.forEach((e) => {
          const q = `SELECT * FROM friends WHERE user1 = ? AND user2 = ?`;
          const friendshipPromise = new Promise((resolve, reject) => {
            db.all(q, [username, e.username], (err, data) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve({ user: e, friendship: data });
              }
            });
          });

          friendshipPromises.push(friendshipPromise);
        });

        Promise.all(friendshipPromises)
          .then((results) => {
            res.json({ results });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
          });
      }
    }
  );
});

app.post("/showFriendReq", (req, res) => {
  const user = req.body.username;
  let q = "select * from friends where user2 = ? and status != ?";
  db.all(q, [user, "accepted"], (err, data) => {
    if (err) console.log(err);
    else if (data !== undefined || data !== null || data.length > 0) {
      res.send(data);
    } else console.log("smth happened");
  });
});

app.post("/pfpsave", (req, res) => {
  const query = "update users set pfp = ? where username = ?";
  db.run(query, [req.body.pfplink, req.body.username], (err) => {
    if (err) console.log(err);
    else res.send("pfp sucess");
  });
});

app.post("/register", (req, res) => {
  const query =
    "insert into users(display_name, username, gender, age, password) values(?,?,?,?,?)";
  db.run(
    query,
    [
      req.body.displayName,
      req.body.username,
      req.body.gender,
      req.body.age,
      req.body.password,
    ],
    (err) => {
      if (err) console.log("error", err);
      else res.send("success");
    }
  );
});

app.post("/getMessages", (req, res) => {
  let q = "select * from messages where friendShip in (select ";
});

app.get("/", (req, res) => {
  res.send("hello world");
});

process.on("exit", () => {
  db.close();
  console.log("closed the database");
});

server.listen(3000, () => {
  console.log("server running on 3000");
});
