const multer = require('multer')
const path = require('path')

const imageConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`);
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("only image is allowed"));
    }
}
const multerUpload = Multer({ storage: Multer.memoryStorage() });

const upload = multer({
    storage: imageConfig,
    fileFilter: isImage
})

module.exports = {
    upload,multerUpload
}

  //for pdf
//   const multerFilter = (req, file, cb) => {
//     if (file.mimetype.split("/")[1] === "pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Not a PDF File!!"), false);
//     }
//   };
