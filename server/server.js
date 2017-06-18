const path= require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=> {
     console.log('new user connected');

     socket.emit('newMessage', generateMessage('Admin','Welcome to the chat App'));

     socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined'));

     socket.on('disconnect', () => {
       console.log('disconnected from the client');
     });

    //  socket.emit('newEmail', {
    //     from: 'abc@exmple.com',
    //     text: ' Hey! Whats up!',
    //     createdAt: 123123
    //  });
     //
    //  socket.on('createEmail', (newEmail) => {
    //    console.log('createEmail', newEmail);
    //  });

    socket.emit('newMessage', generateMessage('Ananda','Message from Server'));

    socket.on('createMessage', (newMessage) => {
       console.log('Message Arrived from Client', newMessage);
       io.emit('newMessage', generateMessage(newMessage.to,newMessage.text));
    });

      //  socket.broadcast.emit('newMessage', {
      //    to: newMessage.to,
      //    text: newMessage.text,
      //    createdAt: new Date().getTime()})
      //  });
});

server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
