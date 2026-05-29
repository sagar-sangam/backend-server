module.exports = mongoose => {

  const schema = mongoose.Schema(
    {
      category: {
        type: String,
      },

      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
      },

      
      subjectId: {
        type: String,
      },

      subjectName: {
        type: String,
      },

      topicTitle: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        enum: ["LECTURE", "NOTES"],
        required: true,
      },

      
      source: {
        type: String,
        default: null,
      },

      
      file: {
        type: String,
        default: null,
      },

      active: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  // IMPORTANT: validation (must have file or source)
  schema.pre("validate", function (next) {

    if (!this.source && !this.file) {
      this.invalidate(
        "source",
        "Either YouTube link or file is required"
      );

      this.invalidate(
        "file",
        "Either YouTube link or file is required"
      );
    }

    next();
  });


  // toJSON like your Order model
  schema.method("toJSON", function () {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const Lecture = mongoose.model("Lecture", schema);

  return Lecture;
};