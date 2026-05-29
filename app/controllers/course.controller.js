// controllers/course.controller.js

const db = require("../models");
const Course = db.courses;

// Create and Save a new Course
exports.create = async (req, res) => {
  try {
    if (!req.body.title || !req.body.category || req.body.price == null) {
      return res.status(400).send({
        message: "Title, category and price are required!",
      });
    }

    const course = new Course({
      category: req.body.category,
      badge: req.body.badge,
      title: req.body.title,
      isNew: req.body.isNew,
      isFree: req.body.isFree,
      language: req.body.language,
      audience: req.body.audience,
      startDate: req.body.startDate,
      price: req.body.price,
      originalPrice: req.body.originalPrice,
      discount: req.body.discount,
      batchName: req.body.batchName,
      validity: req.body.validity,
      description: req.body.description,
      features: req.body.features,
    });

    const data = await course.save();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the course.",
    });
  }
};

// Retrieve all Courses
exports.findAll = async (req, res) => {
  try {
    const data = await Course.find();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving courses.",
    });
  }
};

// Find a single Course by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Course.findById(id);

    if (!data) {
      return res.status(404).send({
        message: `Course not found with id=${id}`,
      });
    }

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Course with id=" + req.params.id,
    });
  }
};

// Update a Course by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Course.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });

    if (!data) {
      return res.status(404).send({
        message: `Cannot update Course with id=${id}. Maybe Course was not found!`,
      });
    }

    res.send({
      message: "Course updated successfully.",
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Course with id=" + req.params.id,
    });
  }
};

// Delete a Course by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Course.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send({
        message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
      });
    }

    res.send({
      message: "Course deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Course with id=" + req.params.id,
    });
  }
};

// Delete all Courses
exports.deleteAll = async (req, res) => {
  try {
    const data = await Course.deleteMany({});

    res.send({
      message: `${data.deletedCount} Courses were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all courses.",
    });
  }
};

// Find all free courses
exports.findAllFree = async (req, res) => {
  try {
    const data = await Course.find({ isFree: true });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving free courses.",
    });
  }
};