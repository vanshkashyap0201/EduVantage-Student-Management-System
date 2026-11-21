const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware")
const { authorizeRoles } = require("../middleware/roleMiddleware")

const {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteStudents
} = require("../controllers/studentController");

// Protect every student route
router.use(verifyToken);

router.get("/", authorizeRoles("Admin", "Teacher"), getStudents);
router.get("/:id", authorizeRoles("Admin", "Teacher"), getStudent);
router.post("/", authorizeRoles("Admin", "Teacher"), addStudent);
router.put("/:id", authorizeRoles("Admin", "Teacher"), updateStudent);
router.delete("/:id", authorizeRoles("Admin"), deleteStudent);
router.delete("/", authorizeRoles("Admin"), deleteStudents);

module.exports = router;
