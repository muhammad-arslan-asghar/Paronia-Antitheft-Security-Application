const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Product=require('../../models/imageupload');
const Img=require('../../models/imagePathupload');
var imageData=Product.find({});
const firebase=require('../../config/firebase');
const formidable=require('formidable');
var fs = require ('fs');
const uuidv4 = require('uuid/v4');
// var admin = require("firebase");

// console.log(firebase);

// const upload=multer({dest:'./uploads/images'})


router.get('/upload',(req,res)=> res.json({msg: "Profile Know"}));

router.get('/photo',function(req,res,next){ 
imageData.exec(function(err,data){
  if(err) throw err;
  res.json(data)
}
)}
);



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./uploads/');
    },
    filename: function(req, file, cb) {
      file.originalname = uuidv4()
      cb(null, file.originalname+".jpg");
    }
  });

  const upload = multer({
    storage: storage
    
  });

  router.post('/photo', upload.single('productImage'), (req, res) => {
    console.log("ServerRunning");
     console.log(req.file.path);
    var new_img = new Img;
    new_img.img.path = req.file.path;
    new_img.img.contentType = 'image/jpeg';
    new_img.save();
    res.json({ message: 'New image added to the db!' });
  
      

  });
  router.get('/getphoto',function(req, res) {
    // Img.find(function(err, img) {
    //     if (err)
    //         res.send(err);
    //     // console.log(img);
    //     res.contentType('json');
    //     res.send(img);
    // }).sort({ createdAt: 'desc' });
    const pics=Img.find()
    .select("img")
    .then(pics=>{res.json(pics)})
    .catch(err=>console.log(err));

});








  router.route("/firebase").get(function (req, res, err) {

    // Get a database reference to our posts

    // var db = firebase.storage();
    //  var ref = db.ref("/images");

    // Attach an asynchronous callback to read the data at our posts reference
    // firebase.storage().bucket().on("value", function (snapshot) {
    //   console.log("WOW:  "+snapshot.val());
    // }, function (errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
// Create a reference under which you want to list

// var listRef = storageRef.child('/images');

// // Find all the prefixes and items.
// listRef.listAll().then(function(res) {
//   res.prefixes.forEach(function(folderRef) {
//     // All the prefixes under listRef.
//     // You may call listAll() recursively on them.
//     console.log("Folder:"+folderRef)
//   });
//   res.items.forEach(function(itemRef) {
//     // All the items under listRef.
//     console.log(itemRef);
//   });
// }).catch(function(error) {
//   // Uh-oh, an error occurred!
// });
// var storage = firebase.storage();
// var storageRef = storage.ref();
// var listRef = storageRef.child('/images');
// listRef.listAll().then(function(res) {
//   res.prefixes.forEach(function(folderRef) {
//     // All the prefixes under listRef.
//     // You may call listAll() recursively on them.
//   });
//   res.items.forEach(function(itemRef) {
//     // All the items under listRef.
//     console.log("WoW"+itemRef)
//   });
// }).catch(function(error) {
//   // Uh-oh, an error occurred!
// });

// firebase.getFiles({
//   // versions: true
// }, function(err, files) {
//   // Each file is scoped to its generation.
//   console.log("Data: "+files.length);
// });

  });






module.exports=router;