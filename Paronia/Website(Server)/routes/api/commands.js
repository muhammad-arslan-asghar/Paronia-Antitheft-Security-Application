const express = require("express");
const router = express.Router();
var Pusher = require('pusher');
var formidable = require('formidable');
const Product=require('../../models/imageupload');
const Audio=require('../../models/audioupload');
const Location=require('../../models/locationupload');
const Calls=require('../../models/callupload');
const User=require('../../models/User')
var fs = require ('fs');
const mongoose = require("mongoose");
const multer = require('multer');
const uuidv4 = require('uuid/v4');
var channel = require('./users');



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
    
     User.findOne({email:req.body.email}).then(user=>{
       if(!user){
           errors.email='User not found';
           return res.json(errors);
       }
 
       console.log("ServerRunning");
       console.log(req.file.path);
       console.log(req.body.email);
       var new_img = new Audio;
       new_img.productImage.data = req.file.path;
       new_img.productImage.ContentType = 'audio/mp3';
       new_img.dataof = user;
       new_img.save();
       res.json({ message: 'New Audio added to the db!' });
   
   
   
   
   });







  
      

  });



//-----------------------------------Get------------------------

  router.get('/getpics',function(req,res){ 
     
    const pics=Product.find()
    .select("productImage")
    .then(pics=>{res.json(pics)})
    .catch(err=>console.log(err));
    
 

 return ;


});
router.get('/test',(req,res)=> res.json({msg: "Users Know"}));


router.get('/getloc',function(req,res){ 

  User.findOne({email:req.query.email}).then(user=>{
    if(!user){
        errors.email='User not found';
        return res.json(errors);
    }
  
    console.log("WOW : "+req.query.email);
    Location.find({dataof:user}).sort({ _id: -1 }).limit(1).select("location")
     
     .exec((err,calls)=>{
         if(err){
           return res.status(400).json({error:err});
         }
         return res.json(calls[0]);
     })



  })

    
  // const loc=Location.find({}).sort({ _id: -1 }).limit(1)
  // .select("location")
  // .then(loc=>{
  //   res.json(loc[0])
  // })
  // .catch(err=>console.log(err));
  


return ;




});
router.get('/getaud',function(req,res){ 

  User.findOne({email:req.query.email}).then(user=>{
    if(!user){
        errors.email='User not found';
        return res.json(errors);
    }
  
    console.log("WOW : "+req.query.email);
    Audio.find({dataof:user})
    .select("productImage")
     
     .exec((err,calls)=>{
         if(err){
           return res.status(400).json({error:err});
         }
         return res.json(calls);
     })



  })



    
  // const loc=Audio.find()
  // .select("productImage")
  // .then(loc=>{res.json(loc)})
  // .catch(err=>console.log(err));
  


return ;




});

//==================Call LOgs GET========================
router.get('/getcall',function(req,res){ 
    
  User.findOne({email:req.query.email}).then(user=>{
    if(!user){
        errors.email='User not found';
        return res.json(errors);
    }
    console.log("User Found"+user)
    console.log("WOW : "+req.query.email);
    Calls.find({dataof:user})
     
     .exec((err,calls)=>{
         if(err){
           return res.status(400).json({error:err});
         }
         return res.json(calls);
     })



  })


  // const loc1=Calls.find()
  // // .select("productImage")
  // .then(loc1=>{res.json(loc1)})
  // .catch(err=>console.log(err));
  







});









//-----------------------------------------Commands-------------------------------------//


  router.get('/pictaken',function(req,res){ 
    console.log("Channel :"+req.query.email)
    channels_client.trigger(req.query.email, 'my-event5',  "my-channel"
    );
    
 

 return ;


});





router.get('/saudtaken',function(req,res){ 
  console.log("Channel :"+req.query.email)
  channels_client.trigger(req.query.email, 'my-event3',  "my-channel"
  );
  


return ;


});


router.get('/eaudtaken',function(req,res){ 
  console.log("Channel :"+req.query.email)
  channels_client.trigger(req.query.email, 'my-event4',  "my-channel"
  );
  


return ;


});



router.get('/loctaken',function(req,res){ 
  console.log("Channel :"+req.query.email)
  channels_client.trigger(req.query.email, 'my-event2',  "my-channel"
  );
  


return ;


});
router.get('/gpstaken',function(req,res){ 
  console.log("Channel :"+req.query.email)
  channels_client.trigger(req.query.email, 'my-event1',  "my-channel"
  );
  


return ;


});
router.get('/alarmtaken',function(req,res){ 
  var chnl=channel.chnl;  
  console.log("Channel :"+req.query.email)
    // var c=chnl;
  channels_client.trigger( req.query.email, 'my-event-alarm',  "my-channel"
  );
  


return ;


});
router.get('/getcallLogs',function(req,res){ 
  // console.log("Channel :"+chnl)
  console.log("Channel call :"+req.query.email)
channels_client.trigger(req.query.email, 'my-event-call',  "my-channel"
);



return ;


});


//-----------------------------------------Post-Location-------------------------------------//





router.post('/getloc',function(req,res){ 



  User.findOne({email:req.body.email}).then(user=>{
    if(!user){
        errors.email='User not found';
        return res.json(errors);
    }

    // console.log(user)
    req.user = user
    // console.log(req.user)

      
    // channels_client.trigger('my-channel', 'my-event2',  "my-channel"
    // );
    console.log("Location")
    // console.log(req.body.email);
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
      loc.dataof = user;   
      

      // console.log("loc",loc)
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

  

});



//......................PostCalls...................................
router.post('/call',function(req,res){ 
      
  // channels_client.trigger('my-channel', 'my-event2',  "my-channel"

  // );
  console.log("Call log: "+req.body.email);
  User.findOne({email:req.body.email}).then(user=>{
    if(!user){
        errors.email='User not found';
        return res.json(errors);
    }

    
  console.log("call")
  console.log(req.body.name);
  console.log(req.body.number);

  console.log(req.body.type);
  console.log(req.body.duration);
//   var lng=req.body.longitude;
//   var lat=req.body.latitude;

    

  const loc1=new Calls();


  
    loc1._id = new mongoose.Types.ObjectId();
    loc1.name=req.body.name;
    loc1.number=req.body.number;
    loc1.type=req.body.type;
    loc1.duration=req.body.duration;
    loc1.dataof=user;
    
 

  loc1.save((err,result)=>{
    if(err){
      return res.json({error:err})
    }
     res.json(result);

  })



  // res.json(lng,lat);
  
  console.log("Save Call data");






});





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