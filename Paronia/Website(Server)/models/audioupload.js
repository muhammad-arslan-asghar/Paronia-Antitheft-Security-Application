

const mongoose = require('mongoose');

const audioSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    productImage: { data: String, ContentType: String }
});

module.exports = mongoose.model('Audio', audioSchema);