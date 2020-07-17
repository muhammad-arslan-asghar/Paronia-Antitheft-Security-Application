const mongoose = require('mongoose');

const callSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // calls: [{ name: String, number: String,duration: String, type: String }]
    name:{
        type:String,
       
    },
    number:{
        type:String,
       
    },
    duration:{
        type:String,
      
    },
    type:{
        type:String,
        
    },

    dataof: {type:mongoose.Schema.ObjectId, ref: "users"}


});

module.exports = mongoose.model('Calls', callSchema);