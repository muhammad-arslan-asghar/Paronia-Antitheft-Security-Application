const express = require("express");
const router = express.Router();
var Pusher = require('pusher');
var formidable = require('formidable');
const Product=require('../../models/imageupload');
const Audio=require('../../models/audioupload');
const Location=require('../../models/locationupload');
var fs = require ('fs');
const mongoose = require("mongoose");
const multer = require('multer');
const uuidv4 = require('uuid/v4');


var channels_client = new Pusher({
    appId: '895772',
    key: 'c63b57c77b42c5b4e59b',
    secret: '6c3fe038d7b3a80603a0',
    cluster: 'ap2',
    encrypted: true
  });


  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null,'./uploadaudio/');
    },
    filename: function(req, file, cb) {
      file.originalname = uuidv4()
      cb(null, file.originalname+".mp3");
    }
  });

  const upload = multer({
    storage: storage
    
  });


  //--------------------------saveaudio-------------------

  router.post('/getaud', upload.single('audio'), (req, res) => {
    console.log("ServerRunning");
     console.log(req.file.path);
    var new_img = new Audio;
    new_img.productImage.data = req.file.path;
    new_img.productImage.ContentType = 'audio/mp3';
    new_img.save();
    res.json({ message: 'New Audio added to the db!' });
  
      

  });



//-----------------------------------Get------------------------

  router.get('/getpics',function(req,res){ 
    // console.log("WOW");
    const pics=Product.find()
    .select("productImage")
    .then(pics=>{res.json(pics)})
    .catch(err=>console.log(err));
    
 

 return ;


});

router.get('/getloc',function(req,res){ 
    
  const loc=Location.find({}).sort({ _id: -1 }).limit(1)
  .select("location")
  .then(loc=>{
    res.json(loc[0])
  })
  .catch(err=>console.log(err));
  


return ;




});
router.get('/getaud',function(req,res){ 
    
  const loc=Audio.find()
  .select("productImage")
  .then(loc=>{res.json(loc)})
  .catch(err=>console.log(err));
  


return ;




});




//-----------------------------------------Commands-------------------------------------//


  router.get('/pictaken',function(req,res){ 
    
    channels_client.trigger('my-channel', 'my-event-pic',  "my-channel"
    );
    
 

 return ;


});





router.get('/saudtaken',function(req,res){ 
    
  channels_client.trigger('my-channel', 'my-event-saud',  "my-channel"
  );
  


return ;


});


router.get('/eaudtaken',function(req,res){ 
    
  channels_client.trigger('my-channel', 'my-event-eaud',  "my-channel"
  );
  


return ;


});



router.get('/loctaken',function(req,res){ 
    
  channels_client.trigger('my-channel', 'my-event-loc',  "my-channel"
  );
  


return ;


});
router.get('/gpstaken',function(req,res){ 
    
  channels_client.trigger('my-channel', 'my-event-gps',  "my-channel"
  );
  


return ;


});
router.get('/alarmtaken',function(req,res){ 
    
  channels_client.trigger('my-channel', 'my-event-alarm',  "my-channel"
  );
  


return ;


});


//-----------------------------------------Post-Location-------------------------------------//





router.post('/getloc',function(req,res){ 
      
    // channels_client.trigger('my-channel', 'my-event2',  "my-channel"
    // );
    console.log(req.body.longitude);
    console.log(req.body.latitude);
    var lng=req.body.longitude;
    var lat=req.body.latitude;

    if(lng==''){

    }  
    else{
    let loc=new Location();

    
      loc._id = new mongoose.Types.ObjectId();
      loc.location.longitude=req.body.longitude;
      loc.location.latitude=req.body.latitude;
   

    loc.save((err,result)=>{
      if(err){
        return res.json({error:err})
      }
       res.json(result);

    })
  }


    // res.json(lng,lat);
    
    // console.log("Picture Send");


 return;


});

//-----------------------------------------Post-Image-------------------------------------//

router.post('/getimg',function(req,res){ 
    console.log("Image");
    // console.log(req.files);
  

  var form = new formidable.IncomingForm();
  form.keepExtensions=true;

    // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

    form.parse(req, function(err, fields, files) {
      if (err) {

        // Check for and handle any errors here.

        console.error(err.message);
        return;
      }
      let product=new Product(fields);
        console.log(files);


          
          if(files.productImage){
            product._id = new mongoose.Types.ObjectId();
            product.productImage.data=fs.readFileSync(files.productImage.path);
            product.productImage.ContentType=files.productImage.type;
         

          product.save((err,result)=>{
            if(err){
              return res.json({error:err})
            }
             res.json(result);

          })


           console.log("Files"+fields+"Fields"+fields);
            // console.log("Files"+files.requestFile.path);
            console.log("Files"+files.productImage.path);
          


        }


    });

  
  // console.log("wow"+req.files);
  // console.log("wow"+req);
  
  
  // console.log("Picture Send");





});

//-----------------------------------------Post-Audio-------------------------------------//

// router.post('/getaud',function(req,res){ 
//   console.log("Audio")
//   console.log("wow"+req);


// var form = new formidable.IncomingForm();
// form.keepExtensions=true;

//   // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

//   form.parse(req, function(err, fields, files) {
//       console.log("Files"+req);
//     console.log("Path::"+files.audio.path)
//     if (err) {

//       // Check for and handle any errors here.

//       console.error(err.message);
//       return;
//     }
//     let product=new Audio(fields);
      


        
//         if(files.audio){
//           product._id = new mongoose.Types.ObjectId();
//           product.productImage.data=fs.readFileSync(files.audio.path);
//           product.productImage.ContentType=files.audio.type;
       

//         product.save((err,result)=>{
//           if(err){
//             return res.json({error:err})
//           }
//           res.json(result);
        

//         })


//         // console.log("Files"+fields+"Fields"+fields);
//         //   // console.log("Files"+files.requestFile.path);
//         //   console.log("Files"+files.productImage.path);
//         // res.setHeader("Content-Type", "text/html");
//         // res.write("recieved");
//         // res.end();


//       }


//   });


// // console.log("wow"+req.files);
// // console.log("wow"+req);


// // console.log("Picture Send");





// });















module.exports=router;