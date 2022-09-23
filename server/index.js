const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { LogModel } = require("./models/LogModel");
const { postLogs, getLogs, deleteLogs } = require("./controllers/Logs");
const {
  getSamples,
  postSamples,
  deleteSamples,
} = require("./controllers/Samples");
const usersRouter = require("./routers/Users");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to train viewer");
});

app.use("/users", usersRouter);

app.get("/logs", getLogs);
app.post("/logs", postLogs);
app.delete("/logs", deleteLogs);

app.get("/objects", getSamples);
app.post("/objects", postSamples);
app.delete("/objects", deleteSamples);

app.set("socket", io);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    );
    io.on("connection", (socket) => {
      console.log("new socket connected");
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
