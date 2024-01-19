const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const mongoose = require("mongoose");
const Disease = require("../models/disease");
const isNutritionist = require("../../middleware/is-nutritionist");
const Question = require("../models/disease-questions");
const Form = require("../models/nutritionist-form");
const checkAuth = require("../../middleware/check-auth");
const FormWithDisease = require("../models/diesase-with-form");
const CustomerDietQuestionAnswer = require("../models/customer-diet-question-answer");
const validateKey = require("../../middleware/validate-key");
const Diate = require("../models/diate");

router.post("/disease", isNutritionist, async (req, res, next) => {
  const defect = new Disease(req.body);
  const userData = req.userdata;
  const ifExists = await Disease.find({
    name: req.body.name,
    createdBy: userData["_id"],
  });
  console.log(ifExists);
  if (ifExists && ifExists.length > 0) {
    return res.status(409).json({
      message: "Disease with same name already exist",
    });
  } else {
    const result = await defect.save();
    return res.status(200).json({
      message: "Disease created successfully",
      data: result,
    });
  }
});

router.get("/disease", validateKey, async (req, res, next) => {
  const diseaseList = await Disease.find().populate("createdBy");
  return res.status(200).json({
    data: diseaseList,
  });
});

router.delete("/disease/:id/delete", isNutritionist, async (req, res, next) => {
  const id = req.params.id;
  const userData = req.userdata;
  const deleted = await Disease.findOneAndDelete({
    _id: id,
    createdBy: userData["_id"],
  });
  if (deleted) {
    return res.status(200).json({
      message: "Deleted successfully",
    });
  } else {
    return res.status(404).json({
      message: "Invalid disease id",
    });
  }
});

router.post("/questions", isNutritionist, async (req, res, next) => {
  const userData = req.userdata;
  const questionBody = new Question(req.body);
  questionBody["createdBy"] = userData["_id"];
  const question = await questionBody.save();
  if (question) {
    return res.status(200).json({
      message: "Question inserted successfully",
      data: question,
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong. Please try again later",
    });
  }
});

router.get("/questions", validateKey, async (req, res, next) => {
  const userData = req.userdata;
  const questions = await Question.find().populate("createdBy");
  return res.status(200).json({
    data: questions,
  });
});

router.delete("/questions/:id", isNutritionist, async (req, res, next) => {
  const userData = req.userdata;
  const id = req.params.id;
  const result = await Question.findByIdAndDelete(id);
  if (result) {
    return res.status(200).json({
      message: "Question removed successfully",
    });
  } else {
    return res.status(404).json({
      message: "Invalid question id",
    });
  }
});

router.post("/form", isNutritionist, async (req, res, next) => {
  const userData = req.userdata;
  const formBody = new Form(req.body);
  formBody["createdBy"] = userData["_id"];
  const savedForm = await formBody.save();
  if (savedForm) {
    return res.status(200).json({
      message: "Form generated successfully",
      data: savedForm,
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong. Please try again later",
    });
  }
});

router.get("/form", validateKey, async (req, res, next) => {
  const userData = req.userdata;
  const formData = await Form.find()
    .populate("createdBy")
    .populate("questions");
  if (formData) {
    return res.status(200).json({
      data: formData,
    });
  }
});

router.delete("/form/:id", isNutritionist, async (req, res, next) => {
  const result = await Form.findByIdAndDelete(req.params.id);
  if (result) {
    return res.status(200).json({
      message: "Form Deleted successfully",
    });
  } else {
    return res.status(200).json({
      message: "Invalid form id",
    });
  }
});

router.post("/form-with-diease", isNutritionist, async (req, res, next) => {
  const userData = req.userdata;
  const formWithDisease = new FormWithDisease(req.body);
  formWithDisease["createdBy"] = userData["_id"];
  const form = await formWithDisease.save();
  if (form) {
    return res.status(200).json({
      message: "Form generated successfully",
      data: form,
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong. Please try again later",
    });
  }
});

router.get(
  "/form-with-diease/:diseaseId",
  validateKey,
  async (req, res, next) => {
    const formId = req.params.diseaseId;
    const result = await FormWithDisease.find({ disease: formId })
      .populate("disease")
      .populate({
        path: "forms",
        populate: {
          path: "questions",
        },
      });
    return res.status(200).json({
      data: result,
    });
  }
);

router.delete(
  "/form-with-diease/:id",
  isNutritionist,
  async (req, res, next) => {
    const result = await FormWithDisease.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        message: "Forms With Disease Deleted successfully",
      });
    } else {
      return res.status(200).json({
        message: "Invalid Forms With Disease id",
      });
    }
  }
);

router.get("/form-with-diease", validateKey, async (req, res, next) => {
  const result = await FormWithDisease.find()
    .populate("disease")
    .populate({
      path: "forms",
      populate: {
        path: "questions",
      },
    });
  return res.status(200).json({
    data: result,
  });
});

// This is for customer..
router.post("/answer", checkAuth, async (req, res, next) => {
  const user = req.userdata;
  const diseaseId = req.body.disease;

  const answer = await CustomerDietQuestionAnswer.findOne({
    user: ObjectId(user.userId),
    disease: ObjectId(diseaseId),
  });
  console.log(req.body, "REQ");

  if (answer) {
    // updating here to the array.
    await CustomerDietQuestionAnswer.update(
      { _id: answer._id },
      { $push: { forms: req.body.forms } }
    );
    return res.status(200).json({
      message: "Successfully inserted",
    });
  } else {
    const questionAnswer = new CustomerDietQuestionAnswer({
      user: ObjectId(user.userId),
      disease: ObjectId(diseaseId),
      forms: [req.body.forms],
    });
    // inserting into it..
    await questionAnswer.save();
    return res.status(200).json({
      message: "Successfully inserted",
    });
  }
});

// Updating for Nutrionist..
router.put("/answer/update/:id", isNutritionist, async (req, res, next) => {
  const item = req.body;
  const itemId = req.params.id;
  Object.keys(item).forEach((k) => item[k] == "" && delete item[k]);
  const statusChange = await CustomerDietQuestionAnswer.update(
    { _id: itemId },
    { $set: item }
  );
  return res.status(200).json({
    message: "Status changed successfully",
  });
});

// Get api for both
router.get("/answers", validateKey, async (req, res, next) => {
  const answers = await CustomerDietQuestionAnswer.find()
    .populate("user", "fullName")
    .populate("disease", "name") // We will get all users data here.
    .populate("forms");
  return res.status(200).json(answers);
});

router.get(
  "/answers/:answerId/:formId",
  validateKey,
  async (req, res, next) => {
    const answerId = req.params.answerId;
    const formId = req.params.formId;

    // const answer = await CustomerDietQuestionAnswer.findOne({ "_id": answerId })
    //   .select({ forms: { $elemMatch: { formId: formId } } })

    const answer = await CustomerDietQuestionAnswer.findOne(
      { _id: answerId, "forms.formId": formId },
      { "forms.$": 1 }
    );

    return res.status(200).json(answer);
  }
);

router.post("/diate", isNutritionist, async (req, res, next) => {
  const user = req.userdata; // Nutrition id.
  const diseaseId = req.body.customer; // Disease id..
  req.body["createdBy"] = user.userId;
  const diatePlan = Diate(req.body);
  await diatePlan.save();
  return res.status(200).json({
    message: "Diate plan is inserted",
  });
});

router.get("/diate", isNutritionist, async (req, res, next) => {
  const diateChart = await Diate.find()
    .populate("createdBy", "fullName")
    .populate("disease", "name")
    .populate("diatePlan.ingredient")
    .populate("customer", "fullName");
  return res.status(200).json(diateChart);
});

router.get("/diate/:diateId", isNutritionist, async (req, res, next) => {
  const diateId = req.params.diateId;
  const diateChart = await Diate.findOne({ _id: diateId })
    .populate("createdBy", "fullName")
    .populate("disease", "name")
    .populate("diatePlan.ingredient")
    .populate("customer", "fullName");
  return res.status(200).json(diateChart);
});

router.get("/customer/diate", checkAuth, async (req, res, next) => {
  const userId = req.userdata.userId;

  const diateChart = await Diate.find({ customer: userId })
    .populate("createdBy", "fullName")
    .populate("disease", "name")
    .populate({
      path: "diatePlan",
      populate: {
        path: "ingredient",
        model: "items",
        populate: {
          path: "varients",
          model: "itemVarient",
        },
      },
    })
    .populate({
      path: "diatePlan",
      populate: "varient",
    })
    .populate("customer", "fullName");
  if (diateChart) {
    return res.status(200).json(diateChart);
  } else {
    return res.status(404).json({ message: "No Data Found" });
  }
});

module.exports = router;
