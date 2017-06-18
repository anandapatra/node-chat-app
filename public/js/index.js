var socket = io();
socket.on('connect', function () {
  console.log('connected to the server');

  // socket.emit('createEmail', {
  //     to: 'jen@example.com',
  //     text: 'How are you'
  // });

  socket.emit('createMessage', {
     to: 'Ayaan',
     text: 'create message'
  });

});
socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

// socket.on('newEmail', function(email) {
//   console.log('new email', email);
// });

socket.on('newMessage', function (newMessage) {
   console.log('New Message from Server', newMessage);
});
