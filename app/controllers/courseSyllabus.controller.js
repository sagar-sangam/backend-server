
const db = require("../models");
const CourseSyllabus = db.courseSyllabus;

// Create syllabus
exports.createSyllabus = async (req, res) => {
  try {
    const syllabus = await CourseSyllabus.create(req.body);

    res.status(201).json({
      success: true,
      message: "Syllabus created successfully",
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all syllabus
exports.getAllSyllabus = async (req, res) => {
  try {
    const syllabus = await CourseSyllabus.find();

    res.status(200).json({
      success: true,
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get syllabus by ID
exports.getSyllabusById = async (req, res) => {
  try {
    const syllabus = await CourseSyllabus.findById(req.params.id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found",
      });
    }

    res.status(200).json({
      success: true,
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update syllabus
exports.updateSyllabus = async (req, res) => {
  try {
    const syllabus = await CourseSyllabus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Syllabus updated successfully",
      data: syllabus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete syllabus
exports.deleteSyllabus = async (req, res) => {
  try {
    const syllabus = await CourseSyllabus.findByIdAndDelete(
      req.params.id
    );

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Syllabus deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};