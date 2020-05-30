var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ImgSchema = new Schema({
    img: { path: String, contentType: String}
}, {
    timestamps: true
});
module.exports = mongoose.model('Img', ImgSchema);