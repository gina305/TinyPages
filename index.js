// Include required libraries
const express = require('express');
const fileUpload = require('express-fileupload');
const JSFtp = require('jsftp');
const fs = require('fs');

const app = express();

// Enable file upload middleware
app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let ftpFile = req.files.file;
  let path = `./${ftpFile.name}`;

  // Use the mv() method to place the file somewhere on your server
  ftpFile.mv(path, (err) => {
    if (err) return res.status(500).send(err);

    // FTP Server details
    let Ftp = new JSFtp({
      host: 'ftp.yourdomain.com',
      port: 21, // defaults to 21
      user: 'username', // defaults to 'anonymous'
      pass: 'password' // defaults to '@anonymous'
    });

    Ftp.put(path, `/remote/path/${ftpFile.name}`, (hadErr) => {
      if (!hadErr) {
        console.log('File transferred successfully!');
      }

      // Delete file after transferring
      fs.unlink(path, (delErr) => {
        if (delErr) console.error(delErr);
        console.log('Local file deleted');
      });

      res.send('File uploaded!');
    });
  });
});

app.listen(8000, () => {
  console.log('Server started on http://localhost:8000');
});
