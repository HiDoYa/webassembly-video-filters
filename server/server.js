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
      res.sendStatus(200);
  } else {
      console.log(`${req.ip} ${req.method} ${req.url}`);
      next();
  }
});


app.post('/upload', function(req, res) {
  let uploadPath;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req['files'].thumbnail;
  uploadPath = __dirname + '/videos/' + file.name;

  // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });
});

app.get('/download', function(req, res){
  let path = __dirname+'/videos';
  fs.readdir(path, (err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("\nCurrent directory filenames:"); 
      res.send(files);
    } 

  }) 
});

app.get('/playFile', function(req, res) {
  let path = __dirname+'/videos/';
  console.log(req['query'].name);
  res.sendFile(path + req['query'].name);
});

app.listen(4201, function() {
  console.log("Server now listening on 4201")
});