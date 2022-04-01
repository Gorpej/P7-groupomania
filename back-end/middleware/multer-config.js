const multer = require('multer');

const MIME_TYPES = {
    'media/jpg': 'jpg',
    'media/jpeg': 'jpg',
    'media/png': 'png'
};

//enregistrement des images sur le disque
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'media')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');