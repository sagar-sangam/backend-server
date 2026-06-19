module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      issueType: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ["Open", "Resolved"],
        default: "Open"
      },
      reply: {
        type: String,
        default: ""
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Support = mongoose.model("support", schema);
  return Support;
};