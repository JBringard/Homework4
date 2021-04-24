const Mongoose = require('mongoose');

module.exports = Mongoose.model('Entity', new Mongoose.Schema({
  Name: { type: String, required: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
