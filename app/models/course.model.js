module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: String,

      category: {
        type: String,
        required: true
      },

      badge: {
        type: String,
        default: ""
      },

      title: {
        type: String,
        required: true
      },

      isNew: {
        type: Boolean,
        default: false
      },

      isFree: {
        type: Boolean,
        default: false
      },

      language: {
        type: String,
        default: ""
      },

      audience: {
        type: String,
        default: ""
      },

      startDate: {
        type: Date
      },

      price: {
        type: Number,
        required: true
      },

      originalPrice: {
        type: Number,
        default: 0
      },

      discount: {
        type: String,
        default: "0%"
      },

      batchName: {
        type: String,
        default: ""
      },

      validity: {
        type: String,
        default: ""
      },

      description: {
        type: String,
        default: ""
      },

      features: [
        {
          type: String
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Course = mongoose.model("course", schema);

  return Course;
};