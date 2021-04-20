require('dotenv').config();
const Express = require('express');
const path = require('path');

const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Mongoose = require('mongoose');

app.use('/static', Express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

(async () => {
  await Mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(process.env.PORT);
})();
