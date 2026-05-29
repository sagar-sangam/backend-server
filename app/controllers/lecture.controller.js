const db = require("../models");
const Lecture = db.lectures;

const fs = require("fs");
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\resources\static\assets
  //C:\Users\Administrator\AngularNodeExpressMySQL\node-js-server\app\resources\static\assets\uploads\
  global.__basedir = __dirname;

// CREATE
exports.create = async (req, res) => {
  try {
    const lecture = new Lecture({
      category: req.body.category,
      courseId: req.body.courseId,
      subjectId: req.body.subjectId,
      subjectName: req.body.subjectName,
      topicTitle: req.body.topicTitle,
      type: req.body.type,
      source: req.body.source || null,
      file: req.file ? req.file.filename : null,
      active: req.body.active !== undefined ? req.body.active : true,
    });

    const savedLecture = await lecture.save();

    res.status(201).send({
      success: true,
      data: savedLecture,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



// GET ALL
exports.findAll = async (req, res) => {

  try {

    const data = await Lecture.find()
      .populate("courseId")
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



// GET ONE
exports.findOne = async (req, res) => {

  try {

    const data = await Lecture.findById(req.params.id)
      .populate("courseId")

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Lecture not found",
      });
    }

    res.send({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



// UPDATE
exports.update = async (req, res) => {

  try {

    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).send({
        success: false,
        message: "Lecture not found",
      });
    }

    // delete old file if new file uploaded
    // if (req.file && lecture.file) {

    //   const oldFilePath = path.join(
    //     __dirname,
    //     "../resources/static/assets/uploads/",
    //     lecture.file
    //   );

    //   if (fs.existsSync(oldFilePath)) {
    //     fs.unlinkSync(oldFilePath);
    //   }

    //   lecture.file = req.file.filename;
    // }

    lecture.category = req.body.category || lecture.category;
    lecture.courseId = req.body.courseId || lecture.courseId;
    lecture.subjectId = req.body.subjectId || lecture.subjectId;
    lecture.subjectName = req.body.subjectName || lecture.subjectName;
    lecture.topicTitle = req.body.topicTitle || lecture.topicTitle;
    lecture.type = req.body.type || lecture.type;

    if (req.body.source !== undefined) {
      lecture.source = req.body.source;
    }

    if (req.body.active !== undefined) {
      lecture.active = req.body.active;
    }

    const updated = await lecture.save();

    res.send({
      success: true,
      data: updated,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



// DELETE
exports.delete = async (req, res) => {

  try {

    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).send({
        success: false,
        message: "Lecture not found",
      });
    }

    // delete file from uploads folder
    if (lecture.file) {

      const filePath = path.join(
        __dirname,
        "../resources/static/assets/uploads/",
        lecture.file
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Lecture.findByIdAndDelete(req.params.id);

    res.send({
      success: true,
      message: "Lecture deleted successfully",
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
// FIND BY COURSE
exports.findByCourse = async (req, res) => {

  try {

    const data = await Lecture.find({
      courseId: req.params.courseId
    })
    .populate("courseId")
    .sort({ createdAt: -1 });

    res.send({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// FIND BY SUBJECT
exports.findBySubject = async (req, res) => {

  try {

    const data = await Lecture.find({
      subjectId: req.params.subjectId
    })
    .populate("courseId")
    .populate("subjectId")
    .sort({ createdAt: -1 });

    res.send({
      success: true,
      data,
    });

  } catch (error) {

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};