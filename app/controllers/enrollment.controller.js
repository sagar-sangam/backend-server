const db = require("../models");

const Enrollment = db.enrollments;
const Course = db.courses;
const User = db.user;

exports.create = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).send({
        message: "User or Course not found",
      });
    }

    const exists = await Enrollment.findOne({
      user: userId,
      course: courseId,
      paymentStatus: "paid",
    });

    if (exists) {
      return res.status(400).send({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).send(enrollment);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, amountPaid, expiryDate } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(+
      id,
      {
        paymentStatus: "paid",
        transactionId,
        amountPaid,
        purchaseDate: new Date(),
        expiryDate,
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).send({
        message: "Enrollment not found",
      });
    }

    res.send(enrollment);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.paymentFailed = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        paymentStatus: "failed",
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).send({
        message: "Enrollment not found",
      });
    }

    res.send(enrollment);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Enrollment.find()
      .populate("user")
      .populate("course");

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.popular = async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $group: {
          _id: "$course",
          totalEnrollments: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalEnrollments: -1
        }
      },
      {
        $lookup: {
          from: "courses", 
          localField: "_id",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $project: {
          _id: 0,
          courseId: "$course._id",
          title: "$course.title",
          category: "$course.category",
          price: "$course.price",
          totalEnrollments: 1
        }
      }
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await Enrollment.findById(req.params.id)
      .populate("user")
      .populate("course");

    if (!data) {
      return res.status(404).send({
        message: "Enrollment not found",
      });
    }

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.findByUser = async (req, res) => {
  try {
    const data = await Enrollment.find({
      user: req.params.userId,
      paymentStatus: "paid",
    }).populate("course");

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        progress: req.body.progress,
      },
      {
        new: true,
      }
    );

    if (!enrollment) {
      return res.status(404).send({
        message: "Enrollment not found",
      });
    }

    res.send(enrollment);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).send({
        message: "Enrollment not found",
      });
    }

    res.send({
      message: "Enrollment deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};