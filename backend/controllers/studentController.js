const Student = require("../models/studentSchema");
const User = require("../models/userSchema");

// Get
const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    }
    catch (err) {
        next(err);
    }
};

// Get by Id
const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            const error = new Error("Student not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(student);
    }
    catch (err) {
        next(err);
    }
};

// Create
const addStudent = async (req, res, next) => {
    try {
        const email = req.body.email?.trim().toLowerCase();

        if (!email) {
            const error = new Error("Student email is required");
            error.statusCode = 400;
            return next(error);
        }

        // Check if a login account already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error(
                "A user account with this email already exists"
            );
            error.statusCode = 409;
            return next(error);
        }

        // Check if a student record already exists
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            const error = new Error(
                "A student with this email already exists"
            );
            error.statusCode = 409;
            return next(error);
        }

        // Create the student record
        const student = await Student.create({
            ...req.body,
            email,
        });

        try {
            // Create the student's login account
            const user = await User.create({
                email,
                password: "123456",
                role: "Student",
            });

            return res.status(201).json({
                message: "Student and login account created successfully",
                student,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            // Roll back the student record if account creation fails
            await Student.findByIdAndDelete(student._id);
            throw error;
        }
    } catch (err) {
        next(err);
    }
};


// Update Student
const updateStudent = async (req, res, next) => {
    try {
        const { _id, createdAt, updatedAt, ...updates } = req.body;
        if (updates.email) updates.email = updates.email.trim().toLowerCase();

        const existing = await Student.findById(req.params.id);
        if (!existing) {
            const error = new Error("Student not found");
            error.statusCode = 404;
            return next(error);
        }

        const student = await Student.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (updates.email && updates.email !== existing.email) {
            await User.updateOne(
                { email: existing.email, role: "Student" },
                { email: updates.email }
            );
        }

        res.status(200).json({ message: "Student Updated Successfully", student });
    } catch (err) {
        next(err);
    }
};
// Delete single Student
const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            const error = new Error("Student not found");
            error.statusCode = 404;
            return next(error);
        }
        await User.deleteOne({ email: student.email, role: "Student" });

        res.status(200).json({
            message: "Student Deleted Successfully"
        });
    }
    catch (err) {
        next(err);
    }
};

// Delete Multiple Students
const deleteStudents = async (req, res, next) => {
    try {
        const { studentIds } = req.body;

        // Validate student IDs
        if (!Array.isArray(studentIds) || studentIds.length === 0) {
            const error = new Error(
                "Please provide an array of student IDs"
            );
            error.statusCode = 400;
            return next(error);
        }

        // Delete multiple students
        const result = await Student.deleteMany({
            _id: { $in: studentIds }
        });
        await User.deleteMany({ email: { $in: emails }, role: "Student" });

        res.status(200).json({
            message: "Students Deleted Successfully",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteStudents
};