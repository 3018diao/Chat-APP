// 引入模块
const express = require('express');
const socket = require('socket.io');

// 实例化express对象
const app = express();



// 监听端口号
const server = app.listen(4000, () => {
  console.log('Server running...');
});

// 让服务器识别静态文件
app.use(express.static('public'));

// 设置socket.io
const io = socket(server);
io.on('connection', (socket) => {
  console.log('实现socket连接', socket.id);

  // 获取从客户端发送的数据
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // 获取从客户端发送的数据(typing)
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data)
  })
})
