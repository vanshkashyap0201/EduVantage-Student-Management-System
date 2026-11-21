const Teacher = require("../models/teacherSchema");

// Get
const getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json(teachers);
    }
    catch (err) {
        next(err);
    }
};

// Get by Id
const getTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            const error = new Error("Teacher not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(teacher);
    }
    catch (err) {
        next(err);
    }
};

// Create
const addTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.create(req.body);

        res.status(201).json({
            message: "Teacher Added Successfully",
            teacher
        });
    }
    catch (err) {
        next(err);
    }
}

// Update
const updateTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!teacher) {
            const error = new Error("Teacher not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Teacher Updated Successfully",
            teacher
        });
    }
    catch (err) {
        next(err);
    }
};

// Delete
const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!teacher) {
            const error = new Error("Teacher not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Teacher Deleted Successfully"
        });
    }
    catch (err) {
        next(err);
    }
};

// Delete Multiple Teachers
const deleteTeachers = async (req, res, next) => {
    try {
        const { teacherIds } = req.body;

        // Validate teacher IDs
        if (!Array.isArray(teacherIds) || teacherIds.length === 0) {
            const error = new Error(
                "Please provide an array of teacher IDs"
            );
            error.statusCode = 400;
            return next(error);
        }

        // Delete multiple teachers
        const result = await Teacher.deleteMany({
            _id: { $in: teacherIds }
        });

        res.status(200).json({
            message: "Teachers Deleted Successfully",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTeachers,
    getTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    deleteTeachers
};