const mongoose = require("mongoose");

const CustomerDietQuestionsAnswers = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
      required: true,
    },
    forms: [
      {
        formId: {
          type : mongoose.Schema.Types.ObjectId,
          ref : "NutritionForm"
        },
        formName: {
          type : String
        },
        answers: [
          {
            question: {
              type: String,
              required: true
            },
            answer: {
              type: String,
              required:true
            }
          }
        ]
      }
    ],
    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "DIET_BIENG_PREPARED", "DIET_SENT"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CustomerDietQuestionsAnswers",
  CustomerDietQuestionsAnswers
);
