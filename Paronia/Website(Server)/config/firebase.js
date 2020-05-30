 var firebase=require('firebase');
//  var admin = require("firebase-admin");

  var firebaseConfig = {
    apiKey: "AIzaSyDjdFL5SxHb_GNdZB-3NseSosAwAo8GFdo",
    authDomain: "myproject-d710e.firebaseapp.com",
    databaseURL: "https://myproject-d710e.firebaseio.com",
    projectId: "myproject-d710e",
    storageBucket: "myproject-d710e.appspot.com",
    messagingSenderId: "187192398461",
    appId: "1:187192398461:web:d1b1a7410b85ecef5a9714"
  };
firebase.initializeApp(firebaseConfig);

// const bucket=admin.storage().bucket('images');
  // var t=firebase.storage();
  // var storage = firebase.storage();
  
  module.exports=firebase;