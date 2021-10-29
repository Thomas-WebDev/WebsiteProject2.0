const path = require('path');
const fs = require('fs');
const multer  = require('multer');

const storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/img/posts');
    },
    filename: function(req, file, cb) {
        cb(null, (new Date().getTime()));
    }
});

const upload = multer({storage: storage});

exports.fetchImage = async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postImage = async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateImage = async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteImage = async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}