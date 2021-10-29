const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer  = require('multer');

const storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/img/profile');
    },
    filename: function(req, file, cb) {
        cb(null,  'ProfilePicture-' + (new Date().getTime()));
    }
});

const upload = multer({storage: storage});

const authController = require('../controllers/auth');

router.post('/register', upload.single('file'), authController.register);

router.post('/login', authController.login);

router.get('/profile', auth, authController.profilePicture);

router.get('/profile/:name', authController.profilePicture);

module.exports = router;