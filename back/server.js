//Dependencies
const express = require('express');
const envConfig = require('dotenv');
const bodyParser = require('body-parser');
const hostname =  process.env.HOSTNAME || 'localhost';
envConfig.config();


//https://awakening-of-the-rebellion.fandom.com/wiki/
const authRoutes = require('./routes/auth');
//const postsRoutes = require('./routes/posts');
const errorController = require('./controllers/errors');

const app = express();

//Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/auth', authRoutes);
//app.use('/posts', postsRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

//Start Server
app.listen(process.env.PORT || 5000, hostname, function(){
  console.log(`HTTP Server running at http://${hostname}:${process.env.PORT || 5000}/`);
});
//var httpsServer = https.createServer(credentials, app).listen(process.env.PORT || 4300, function () {
//    console.log(`HTTPS Server running at https://${hostname}:${process.env.PORT || 5000}/`);
//});

