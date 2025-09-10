const express = require("express");
const { registerKnowlyticsAppUser, testApi } = require("../controllers/knowlyticsAppUserController");
const router = express.Router();



// Register route
router.post("/v1/register", registerKnowlyticsAppUser);
router.get("/test",testApi)


module.exports = router;
