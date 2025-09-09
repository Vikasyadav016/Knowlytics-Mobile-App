const KnowlyticsAppUser = require("../models/KnowlyticsAppUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Knowlytics App User
exports.registerUser = async (req, res) => {
  const {
    fullName,
    fatherName,
    motherName,
    personalEmail,
    guardianEmail,
    personalContactNo,
    guardianContactNo,
    profession,
    guardianProfession,
    standardOfStudent,
    password,
  } = req.body;

  try {
    const personaluser = await KnowlyticsAppUser.findOne({ personalEmail });
    if (personaluser) {
      return res.status(400).json({ msg: "Personal email already registered" });
    }
    const personalContact = await KnowlyticsAppUser.findOne({ personalContactNo });
    if (personalContact) {
      return res.status(400).json({ msg: "Personal contact number already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new KnowlyticsAppUser({
      fullName,
      fatherName,
      motherName,
      personalEmail,
      guardianEmail,
      personalContactNo,
      guardianContactNo,
      profession,
      guardianProfession,
      standardOfStudent,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
