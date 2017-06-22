var socket = io();
socket.on('connect', function () {
  console.log('connected to the server');
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm:ss a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm:ss a');
     var template = jQuery('#location-message-template').html();
     var html = Mustache.render(template, {
          url: message.url,
          from: message.from,
          createdAt: formattedTime
     });
     jQuery('#messages').append(html);
});

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
