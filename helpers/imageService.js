const multer = require("multer");
const path = require("path");
const createHttpError = require("http-errors");
const storage = multer.diskStorage({
  destination: path.join(__dirname + "\\..\\public"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "." + file.mimetype.split("/").pop());
  },
});

const upload = multer({
  storage: storage,
  dest: path.join(__dirname + "\\..\\public"),
  fileFilter: (_req, file, cb)=>checkFileType(file, cb)
});


const checkFileType = (file, cb) => {
  const filetypes = /png|jpg|svg|webp/;
  // Check extesion file
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype file
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    const httpError = createHttpError(
      400,
      `[Error Upload Image] - [ImageService - POST]: Extension no valida en el archivo`
    );
    cb(httpError);
  }
}


module.exports = { upload };
