const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({

    // Personal Details
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    gender: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    nationality: {
        type: String,
        default: "Indian"
    },

    phone: {
        type: String,
        required: true
    },

    // Identification Details
    photo: {
        type: String
    },

    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },

    // Address Details
    address: {
        houseNo: {
            type: String
        },

        street: {
            type: String
        },

        area: {
            type: String
        },

        city: {
            type: String,
            required: true
        },

        district: {
            type: String
        },

        state: {
            type: String,
            required: true
        },

        country: {
            type: String,
            required: true,
            default: "India"
        },

        pincode: {
            type: String,
            required: true
        }
    },


    // Professional Details
    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    department: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    qualification: {
        type: String,
        required: true
    },

    specialization: {
        type: String
    },

    joiningDate: {
        type: Date,
        required: true
    },

    experience: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        enum: ["Teacher", "HOD", "Admin"],
        default: "Teacher"
    },


    // Other Details
    status: {
        type: String,
        enum: ["Active", "Inactive", "Retired"],
        default: "Active"
    },

    emergencyContact: {
        name: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        occupation: {
            type: String
        }
    },

}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);