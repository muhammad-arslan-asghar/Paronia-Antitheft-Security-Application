const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
// var flash = require('flash');
var multer = require('multer');

const users=require('./routes/api/users');
const uploads=require('./routes/api/uploads');
const commands=require('./routes/api/commands');
var cors = require('cors');
 
const app= express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const corsOptions = {
    Origin: "http://localhost:5000/",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept"
  };



app.use(cors(corsOptions));

// app.use(flash());

//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




app.use('/uploads',express.static('./uploads'));
app.use('/uploadaudio',express.static('./uploadaudio'));


//DB Config
const db=require('./config/keys').mongoURI;


mongoose.connect(db).then(()=>console.log('MongoDB Connected')).catch(err=>console.log(err));



// const dbRef = fb.database().ref();
// const usersRef = dbRef.child('users');
// fb.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//         console.log(snapshot.val());
// }


//passpor middleware

app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//user ROutes
app.use('/api/users',users);
app.use('/api/uploads',uploads);
app.use('/api/commands',commands);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running on port ${port}`)) ;
