require('dotenv').config();
const Express = require('express');
const Mongoose = require('mongoose');

const path = require('path');

const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Entity = require('../models/entityModel');

app.use('/static', Express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.on('submit', async (msg) => {
    await new Entity({ Name: msg.toString() }).save();
  });

  socket.on('search', async (msg) => {
    const results = await Entity.find({ Name: { $regex: `/${msg}/i` } });
    socket.emit('search', results);
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
