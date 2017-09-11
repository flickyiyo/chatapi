var express = require('express');
var app = require('./app');
var http = require('http').createServer(app);
var connection = require('./connection');
var io = require('socket.io')(http);
connection.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  }).catch(err => {
    console.error('Unable to connect to MySQL');
  });

http.listen(8000, () => {
  console.log('http://localhost:8000');
})
io.on('connection', (socket) => {
  var room;
  let messages = [];
  let Message = require('./models/message')(connection, require('sequelize'));

  console.log(socket.handshake.address);
  socket.emit('connected','');
  socket.once('join', (r) => {
    console.log(r);
    room = r;
    socket.join(r);
    Message.findAll({
      where:{
        uuid_room:room
      }
    }).then(msgs => {
      console.log(msgs);
      messages = msgs;
      io.sockets.in(room).emit('getmessage',msgs);
      io.sockets.in(r).emit('joined', msgs);
    }).catch(err => {
      console.log(err)
    });
  });

  socket.on('new message', (data) => {
    console.log(data);
    Message.create({
      id:0,
      uuid_room:room,
      text:data.text,
      id_user:data.id_user,
      username:data.username
    }).then(msg => {
      messages.push(msg);
      io.sockets.in(room).emit('getmessage', messages);
    })
  });
})