import express from "express";
import SocketIO from "socket.io";
import _ from "underscore";
import questions from "./questions";

let app = express();
let port = 3000;

app.use(express.static("./dist/public"));
app.use(express.static("./node_modules/bootstrap/dist"));

let server = app.listen(port);
let io = new SocketIO(server);

var title = "Untitled Presentation";
var audience = [];
var speaker = {};
var connections = [];
var currentQuestion = false;

io.on("connection", socket => {
  socket.once("disconnect", () => {
    var member = _.findWhere(audience, { id: socket.id });
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
    } else if (socket.id === speaker.id) {
      speaker = {};
      title = "Untitled Presentation";
      io.sockets.emit("end", { title: title, speaker: "" });
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
  });

  socket.on("join", payload => {
    var member = {
      id: socket.id,
      name: payload.name,
      type: "member"
    };
    socket.emit("joined", member);
    audience.push(member);
    io.sockets.emit("audience", audience);
  });

  socket.on("start", payload => {
    speaker.name = payload.name;
    speaker.id = socket.id;
    speaker.type = "speaker";
    socket.emit("joined", speaker);
    io.sockets.emit("start", {
      title: payload.title,
      audience: audience,
      speaker: speaker.name
    });
  });

  socket.on("ask", question => {
    currentQuestion = question;
    io.sockets.emit("ask", currentQuestion);
  });

  socket.emit("welcome", {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion
  });
  connections.push(socket);
});

console.log(`Express server is running on port ${port}`);
