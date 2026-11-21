const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

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

    age: {
        type: Number,
        required: true
    },

    nationality: {
        type: String,
        default: "Indian"
    },

    category: {
        type: String,
        enum: ["General", "OBC", "SC", "ST", "Other"]
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


    // Academic Details
    admissionNumber: {
        type: String,
        required: true,
        unique: true
    },

    rollNumber: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    admissionDate: {
        type: Date,
        required: true
    },


    // Parent / Guardian Details
    parents: [
        {
            name: {
                type: String,
                required: true
            },
            relation: {
                type: String,
                enum: ["Father", "Mother", "Guardian"],
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
        }
    ],


    // Other Details
    status: {
        type: String,
        enum: ["Active", "Inactive", "Graduated"],
        default: "Active"
    },

    bloodGroup: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);