const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const multer  = require('multer');
const User = require('../models/Users');
const envConfig = require('dotenv');
envConfig.config();

const storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/img/profile');
    },
    filename: function(req, file, cb) {
        cb(null,  'ProfilePicture-' + (new Date().getTime()));
    }
});

const upload = multer({storage: storage});

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);
    if (user[0].length !== 1) {
      console.log('A user with this email could not be found.');
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user[0][0].password);

    if (!isEqual) {
      console.log('Wrong password!');
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user[0][0].id,
      },
      process.env.JWTSECRET,
      { expiresIn: '12h' }
    );
    res.status(200).json({ token: token, userId: user[0][0].id});
  } catch (err) {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.register = async (req, res, next) => {
  console.log(req.body);
  var emailInUse = false;
  var userInUse = false;
  var name = req.body.name;
  var email = req.body.email.toLowerCase();
  var password = req.body.password.trim();
  const profilePicture = req.file.filename;
  const imagePath = path.join(__dirname, "../public/uploads/img/profile/", profilePicture);
  try {
      var hashedPassword = await bcrypt.hash(password, 12);
      const userDetails = {
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture
      };
      user = await User.findOne(userDetails);
      if (user[0].length!=0) {
        console.log("FOUND");
        if(email == user[0][0].email) {   
            console.log("FOUND EMAIL");         
            emailInUse = true;
        }
        if(name.toLowerCase() == user[0][0].name.toLowerCase()) {   
            console.log("FOUND NAME");   
            userInUse = true;
        }
        fs.unlinkSync(imagePath);
        return res.status(201).json({ success: false, message: 'Duplicate data', userInUse: userInUse, emailInUse: emailInUse });
      }
      await User.save(userDetails);
      return res.status(201).json({ success: true, message: 'User registered' });           
  } catch (err) {
      fs.unlinkSync(imagePath);
      if (!err.statusCode) {
          err.statusCode = 500;
      }
      console.log("ERROR:" + err);
      next(err);
  }
};

exports.profilePicture = async (req, res, next) => {
  const imageName = req.params.name;
  const imagePath = path.join(__dirname, "../public/uploads/img/profile/", imageName);
  try {
    const r = fs.createReadStream(imagePath)
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(r, ps, // <---- this makes a trick with stream error handling
      (err) => {
        if (err) {
          console.log(err) // No such file or any other kind of error
          return res.sendStatus(400); 
        }
      }
    )
    ps.pipe(res) // <---- this makes a trick with stream error handling
  } catch (err) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    console.log("ERROR:" + err);
    next(err);
  }
};