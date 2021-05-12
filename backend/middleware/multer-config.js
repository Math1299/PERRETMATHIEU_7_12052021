const multer = require("multer");

//DICTIONNAIRE POUR LES EXTENSIONS DES IMAGES
const MIME_TYPES = {
    "images/jpg": "jpg",
    "images/jpeg": "jpg",
    "images/png": "png",
};

//LA CONST STORAGE EST PASSEE A MULTER COMME CONFIG AVEC LA LOGIQUE D ENREGISTREMENT
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, res, callback) => {
        const name = file.originalname.split(" ").join("_"); //REMPLACE ESPACE PAR UNDERSCORE
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

module.exports = multer({ storage }).single("image");
