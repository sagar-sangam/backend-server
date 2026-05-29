const multer = require("multer");

const path = require("path");

const fs = require("fs");


const uploadDir = "uploads";


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});


const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    "application/pdf",

    "image/png",

    "image/jpg",

    "image/jpeg",

    "video/mp4",
  ];


  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error("Invalid file type"),
      false
    );
  }
};


module.exports = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});