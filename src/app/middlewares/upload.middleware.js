const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'uploads/'
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 // Giới hạn kích thước file: 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not file images!'), false);
        }
    }
});

module.exports = { upload }