const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // protect all routes below

router.post("/create", jobController.createJob);
router.get("/get", jobController.getJobs);
router.put("/update/:id", jobController.updateJob);
router.delete("/delete/:id", jobController.deleteJob);

module.exports = router;
