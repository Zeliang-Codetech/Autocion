import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads'); // specify the folder to save the photos
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "" + file.originalname); // use the original name of the file
    }
});

export const upload = multer({ storage: storage }).single("image");