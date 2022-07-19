const socket_io = require('socket.io');
var io = socket_io();
var socketAPI = {};

socketAPI.io = io;

io.on("connection", (socket) => {
    socket.on('message', (data) => {
        console.log(data);
    })
});


module.exports = socketAPI;