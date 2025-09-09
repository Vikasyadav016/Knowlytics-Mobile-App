const mongoose = require("mongoose");

const knowlyticsAppUserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },          // no unique
  fatherName: { type: String, required: true },        // no unique
  motherName: { type: String, required: true },        // no unique
  personalEmail: { type: String, required: true, unique: true },
  guardianEmail: { type: String, required: true },
  personalContactNo: { type: String, required: true, unique: true },
  guardianContactNo: { type: String, required: true, },
  profession: { type: String, required: true },        // no unique
  guardianProfession: { type: String, required: true },// no unique
  standardOfStudent: { type: String, required: false }, // no unique
  password: { type: String, required: true },
});

module.exports = mongoose.model("KnowlyticsAppUser", knowlyticsAppUserSchema);
