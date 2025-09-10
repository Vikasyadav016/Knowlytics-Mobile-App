const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema for course details
const courseDetailsSchema = new Schema({
  courseName: { type: String, required: true },
  courseOwner: { type: String, required: true },
  courseOwnerCommunityId: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  courseStartDate: { type: Date, required: true },
  courseEndDate: { type: Date, required: true },
  isExpired: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

// Main schema for Knowlytics App Users
const knowlyticsAppUserSchema = new Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  personalEmail: { type: String, required: true, unique: true },
  guardianEmail: { type: String, required: true },
  personalContactNo: { type: String, required: true, unique: true },
  guardianContactNo: { type: String, required: true },
  profession: { type: String, required: true },
  guardianProfession: { type: String, required: true },
  standardOfStudent: { type: String },

  password: { type: String, required: true },

  isPersonalMailVerified: { type: Boolean, default: false },
  isGuardianMailVerified: { type: Boolean, default: false },
  isCommunityAssociation: { type: Boolean, default: false },
  isJoinedAnyCourse: { type: Boolean, default: false },

  joinedCoursesList: [courseDetailsSchema],

  isDeleted: { type: Boolean, default: false },
  userRole: { type: String, default: "student" },

  mobileOtp: { type: String, required: false },
  
}, { timestamps: true });

module.exports = mongoose.model("KnowlyticsAppUser", knowlyticsAppUserSchema);
