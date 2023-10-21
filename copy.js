// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Serve static HTML files
app.use(express.static('public'));

// Route for the main page
app.get('/', (req, res) => {
  const tinyKey =  process.env['TINY_KEY'];
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdn.tiny.cloud/1/${tinyKey}/tinymce/5/tinymce.min.js"></script>
    <script>
      tinymce.init({
        selector: '#mytextarea'
      });
    </script>
  </head>
  <body>
    <textarea id="mytextarea"></textarea>
  </body>
  </html>
  `;

  res.send(htmlContent);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});