const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: { longitude: String, latitude: String },
    dataof: {type:mongoose.Schema.ObjectId, ref: "users"}
});

module.exports = mongoose.model('Location', locationSchema);