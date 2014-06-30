var socketio = require('socket.io');

exports.listen = function( server, Manager ) {
  'use strict';
  var io = socketio.listen( server );

  io.sockets.on('connection', function ( client ) {
    console.log('socket.io connected');
    console.log( client.id );
  });

  
};
