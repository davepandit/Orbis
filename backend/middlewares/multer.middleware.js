import multer from "multer";
import path from "path";
import { __dirname } from "../index.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "public/images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileUpload() {
  // filetypes that are supported
  const filetypes = /jpeg|png|webp/;

  // mime tells about the media type it stands for multimedia internet mail extension
  const mimetypes = /image\/jpeg|image\/png|image\/webp/;

  // initially path.extname(file.originalname) gives the extname like the .jpg and all and then filetypes.test(...) is used to check whether that type is what we are supporting
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // checks the mime type
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

export const upload = multer({ storage, checkFileUpload });
