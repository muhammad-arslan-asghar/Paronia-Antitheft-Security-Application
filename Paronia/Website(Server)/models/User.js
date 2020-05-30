const mongoose=require('mongoose');
const schema=mongoose.Schema;

//Create Schema
const UserSchema=new schema({
name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
isVerified: { 
    type: Boolean,
     default: false },
phonenumber:{
    type:String,
    required:true
},
resetPasswordToken :{
    type:String
},
resetPasswordExpires:{
    type:Date
}
});



module.exports = User= mongoose.model('users',UserSchema);
