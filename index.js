const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });


var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host,() => {
  console.log("listening on *:80");
});


// socket
const io = require("socket.io")(server);

io.on("connection", (socket) =>{
    let no = io.sockets.server.engine.clientsCount;
    let con = ["Someone join the chat.", no];
    socket.broadcast.emit("conn", con);
    console.log("connected");
    socket.on("chatmsg", (msg)=>{
      console.log("message: "+ msg[0]);
      socket.broadcast.emit("chatmsg", msg);
    });
    socket.on("disconnect", () => {
      no = io.sockets.server.engine.clientsCount;

      con = ["Someone left the chat.", no];
      socket.broadcast.emit("disconn", con);

      console.log("user disconnected");

    });
}
);
