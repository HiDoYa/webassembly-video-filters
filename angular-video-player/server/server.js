const { FILE } = require('dns');
const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const app = express();

// default options
app.use(fileUpload());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if('OPTIONS' === req.method) {
      //console.log("passsed");
      res.sendStatus(200);
  } else {
      console.log(`${req.ip} ${req.method} ${req.url}`);
      //console.log("failed");
      next();
  }
});


app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //console.log(req.files.name);
  let file = req['files'].thumbnail;

 // console.log("File uploaded: ", file.name);
  //console.log("file", file );
 // sampleFile = req.files.sampleFile;
  //console.log(sampleFile);
  uploadPath = __dirname + '/videos/' + file.name;

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

   // res.send('File uploaded!');
  });
});

app.get('/download', function(req, res){
  
  //let file = fileUpload.Object(__dirname+'/api/Futurama.S02E11.1080p.HEVC.x265-MeGusta.mkv');
  //console.log(__dirname+ '/videos/lazy.mp4');
  let path = __dirname+'/videos';
  //console.log(file);
  fs.readdir(path, (err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("\nCurrent directory filenames:"); 
      /*files.forEach(file => { 
        console.log(file); 
      }) */
      res.send(files);
    } 

  }) 

  //res.sendFile(__dirname+'/videos/lazy.mp4');
  //console.log("get", req);
  

});

app.get('/playFile', function(req, res){
    let path = __dirname+'/videos/';
    //let file = fileUpload.Object(__dirname+'/api/Futurama.S02E11.1080p.HEVC.x265-MeGusta.mkv');
    console.log(req['query'].name);
    res.sendFile(path + req['query'].name);
    //console.log("get", req);
    
  
  })

app.listen(4201, function() {
  console.log("Server now listening on 4201")});