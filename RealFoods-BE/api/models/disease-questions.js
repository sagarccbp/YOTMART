const mongoose = require("mongoose");

const questionsSchema = mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      required: true,
    },
    answerType: {
      type: String,
      enum: ["CHECK_BOX", "TEXT_AREA", "DROP_DOWN", "RADIO_BUTTON"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answerHint: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionsSchema);
