var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {

  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
       window.location.href = '/';
    }
    else {
       console.log('No Error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
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
  scrollToBottom();
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
     scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
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
