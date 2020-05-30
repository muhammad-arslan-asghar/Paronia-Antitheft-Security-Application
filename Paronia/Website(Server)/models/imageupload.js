

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productImage: { data: Buffer, ContentType: String }
});

module.exports = mongoose.model('Images', productSchema);