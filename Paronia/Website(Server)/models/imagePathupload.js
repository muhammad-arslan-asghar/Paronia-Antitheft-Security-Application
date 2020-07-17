var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ImgSchema = new Schema({
    img: { path: String, contentType: String},
    
    dataof: {type:mongoose.Schema.ObjectId, ref: "users"}
}, 


{
    timestamps: true
}






);
module.exports = mongoose.model('Img', ImgSchema);