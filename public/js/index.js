var socket = io();
socket.on('connect', function () {
  console.log('connected to the server');

  // socket.emit('createEmail', {
  //     to: 'jen@example.com',
  //     text: 'How are you'
  // });

  // socket.emit('createMessage', {
  //    to: 'Ayaan',
  //    text: 'create message'
  // });

});
socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

// socket.on('newEmail', function(email) {
//   console.log('new email', email);
// });

socket.on('newMessage', function (newMessage) {
   console.log('NewMessage', newMessage);
   var li = jQuery('<li></li>');
   li.text(`${newMessage.from}: ${newMessage.text}`);

   jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Ananda',
//   text: 'Hi'
// }, function(data) {
//   console.log('got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function(data) {
    console.log('got it', data);
  });

});
