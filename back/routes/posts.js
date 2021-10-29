const express = require('express');
const postsController = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer  = require('multer');

const storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/img');
    },
    filename: function(req, file, cb) {
        cb(null,  'IMG-' + (new Date().getTime()));
    }
});

const upload = multer({storage: storage});

const router = express.Router();

//Blog post routes

router.get('/:id', postsController.fetch);

router.get('/', postsController.fetchAll);

router.get('/search/:type', postsController.fetchType);

router.get('/fandom/:id', postsController.fetchType);

router.post('/create', upload.single('file'), auth, postsController.postPost);

router.post('/createNoImage', auth, postsController.postPost);

router.post('/edit', upload.single('file'), auth, postsController.postEdit);

router.post('/editNoImage', auth, postsController.postEdit);

router.post('/like/:id', auth, postsController.postLike);

router.post('/view/:id', postsController.postView);

router.delete('/:id', auth, postsController.deletePost);

//Fandom post routes

//Timeline post routes

module.exports = router;