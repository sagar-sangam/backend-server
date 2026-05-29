module.exports = mongoose => {

  const schema = mongoose.Schema(
    {
      courseId: String,

      syllabus: [
        {
          id: String,
          subjectName: String,
          content: String,
        },
      ],
    },
    { timestamps: true }
  );

  const CourseSyllabus = mongoose.model(
    "courseSyllabus",
    schema
  );

  return CourseSyllabus;
};