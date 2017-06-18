const path= require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=> {
     console.log('new user connected');

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

    socket.emit('newMessage', {
        from: 'Ananda',
        text: 'Message from Server'
    });

    socket.on('createMessage', (newMessage) => {
       console.log('Message Arrived from Client', newMessage);
       io.emit('newMessage', {
         to: newMessage.to,
         text: newMessage.text,
         createdAt: new Date().getTime()})
    });
});

server.listen(port, () => {
  console.log(`server started at port ${port}`);
});
