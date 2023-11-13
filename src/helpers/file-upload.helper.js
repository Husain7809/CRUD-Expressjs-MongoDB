const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './profiles/',
    filename: function (req, file, cb) {
        if (!fs.existsSync(__dirname + "../../profiles/")) {
            fs.mkdirSync(__dirname + "../../profiles/");
        }
        cb(null, req.body.name + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({
    dest: __dirname + "../../profiles/",
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    storage: storage,
    fileFilter: function (req, file, cb) {
        try {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                throw new Error('Only image files are allowed!');
            }
            cb(null, true);
        } catch (error) {
            cb(error, false);
        }
    }
});

module.exports = { upload };