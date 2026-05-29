module.exports = app => {

const express = require("express");
const router = express.Router();

const lectureController = require("../controllers/lecture.controller");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


// FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "video/mp4"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};


// STORAGE
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});


// MULTER
const uploadFile = multer({
  storage,
  fileFilter,
});


// CREATE
router.post(
  "/",
  uploadFile.single("file"),
  lectureController.create
);


// GET ALL
router.get("/", lectureController.findAll);


// GET BY COURSE
router.get(
  "/course/:courseId",
  lectureController.findByCourse
);


// GET BY SUBJECT
router.get(
  "/subject/:subjectId",
  lectureController.findBySubject
);


// GET ONE
router.get("/:id", lectureController.findOne);


// UPDATE
router.put(
  "/:id",
  uploadFile.single("file"),
  lectureController.update
);


// DELETE
router.delete("/:id", lectureController.delete);

app.use("/api/lectures", router);
};