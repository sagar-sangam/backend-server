const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    amountPaid: {
      type: Number,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);