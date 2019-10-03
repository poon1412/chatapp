const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');

const http = require("http").Server(app);

const io = require("socket.io");

const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const routes = require("./route/chatroute"); //importing route
routes(app); //register the route

socket = io(http);

socket.on("connection", socket => {
 
    socket.on("disconnect", function() {
    });

    socket.on("Room Create", function(num)
    {
      socket.broadcast.emit("RoomCreate", num);
    });

    socket.on('join', function(room) {
      socket.join(room);
    });

    socket.on('leaves', function(room) {
      socket.leave(room);
    });

    socket.on("chat message",function(msg){
      socket.to(msg.room).emit("received", chatMessage(msg.name,msg.text,msg.time))
    });
    //Someone is typing
    // socket.on("typing", data => {
    //   socket.broadcast.emit("notifyTyping", {
    //     user: data.user,
    //     message: data.message
    //   });
    // });

    //when soemone stops typing
    // socket.on("stopTyping", () => {
    //   socket.broadcast.emit("notifyStopTyping");
    // });
  
    // socket.on("message", function(msg) {
    //   console.log("message: " + msg);
    // socket.broadcast.emit("received", chatMessage(msg.name,msg.text,msg.time));

    // });
});
const chatMessage = (name, text) => {
  return {
      name,
      text,
      time: new Date().getTime()
 };
};
http.listen(port, () => {
    console.log("Running on Port: " + port);
  });

