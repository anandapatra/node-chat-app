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

socket.on('newLocationMessage', function(message) {
      var li = jQuery('<li></li>');
      var a = jQuery('<a target="_blank">My Current Location</a>');

      li.text = `Message from: ${message.from}`
      a.attr('href', message.url);
      li.append(a);

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
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {
    jQuery('[name=message]').val('');
  });

});


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
      if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
      }
      locationButton.attr('disabled', 'disabled').text('Sending Location...');
      navigator.geolocation.getCurrentPosition(function(position) {
         socket.emit('createLocationMessage', {
              lat: position.latitude,
              lon: position.longitude
         });
         locationButton.removeAttr('disabled').text('Send Location');
      }, function(err) {
          alert('Unable to find location');
          locationButton.removeAttr('disabled').text('Send Location');
      });
});
