const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware")

const {
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    deleteTeachers
} = require("../controllers/teacherController");

// Protect every teacher-management route
router.use(verifyToken, authorizeRoles("Admin"));

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.delete("/", deleteTeachers);

module.exports = router;
