const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You cannot upload this file type.'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.route('/')
.get([authenticate.verifyUser, authenticate.verifyAdmin], (req, res) => {
    res.statusCode = 403;
    res.end('Operation not supported.');
})
.post(
    [authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile')],
    (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    }
)
.put([authenticate.verifyUser, authenticate.verifyAdmin], (req, res) => {
    res.statusCode = 403;
    res.end('Operation not supported.');
})
.delete([authenticate.verifyUser, authenticate.verifyAdmin], (req, res) => {
    res.statusCode = 403;
    res.end('Operation not supported.');
})

module.exports = uploadRouter;