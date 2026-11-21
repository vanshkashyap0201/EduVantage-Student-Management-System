export const TeacherFields = [
    // Personal Information
    {
        type: "text",
        name: "name",
        label: "Full Name",
        placeholder: "e.g. John Doe",
        required: true
    },
    {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "e.g. john@example.com",
        required: true
    },
    {
        type: "radio",
        name: "gender",
        label: "Gender",
        options: ["Male", "Female", "Other"],
        required: true
    },
    {
        type: "date",
        name: "dateOfBirth",
        label: "Date of Birth",
        required: true
    },
    {
        type: "text",
        name: "nationality",
        label: "Nationality",
        placeholder: "e.g. Indian",
        defaultValue: "Indian"
    },
    {
        type: "tel",
        name: "phone",
        label: "Phone Number",
        placeholder: "e.g. 9876543210",
        required: true
    },

    {
        type: "text",
        name: "aadhaarNumber",
        label: "Aadhaar Number",
        placeholder: "1234 5678 9012",
        required: true
    },

    // Address Information
    {
        type: "text",
        name: "address.houseNo",
        label: "House No.",
        placeholder: "e.g. 123"
    },
    {
        type: "text",
        name: "address.street",
        label: "Street",
        placeholder: "e.g. Main Street"
    },
    {
        type: "text",
        name: "address.area",
        label: "Area",
        placeholder: "e.g. Model Town"
    },
    {
        type: "text",
        name: "address.city",
        label: "City",
        placeholder: "e.g. Jagadhri",
        required: true
    },
    {
        type: "text",
        name: "address.district",
        label: "District",
        placeholder: "e.g. Yamunanagar"
    },
    {
        type: "text",
        name: "address.state",
        label: "State",
        placeholder: "e.g. Haryana",
        required: true
    },
    {
        type: "text",
        name: "address.country",
        label: "Country",
        placeholder: "e.g. India",
        defaultValue: "India",
        required: true
    },
    {
        type: "text",
        name: "address.pincode",
        label: "Pincode",
        placeholder: "e.g. 135003",
        required: true
    },

    // Professional Information
    {
        type: "text",
        name: "employeeId",
        label: "Employee ID",
        placeholder: "e.g. TCH001",
        required: true
    },
    {
        type: "select",
        name: "department",
        label: "Department",
        options: [
            "Computer Applications",
            "Business Administration",
            "Other"
        ],
        required: true
    },
    {
        type: "text",
        name: "designation",
        label: "Designation",
        placeholder: "e.g. Assistant Professor",
        required: true
    },
    {
        type: "text",
        name: "qualification",
        label: "Highest Qualification",
        placeholder: "e.g. MCA",
        required: true
    },
    {
        type: "text",
        name: "specialization",
        label: "Specialization",
        placeholder: "e.g. Web Development"
    },
    {
        type: "number",
        name: "experience",
        label: "Experience (Years)",
        placeholder: "e.g. 8"
    },
    {
        type: "date",
        name: "joiningDate",
        label: "Joining Date",
        required: true
    },

    // Other Information
    {
        type: "select",
        name: "role",
        label: "Role",
        options: ["Teacher", "HOD", "Admin"],
        defaultValue: "Teacher",
        required: true
    },
    {
        type: "select",
        name: "status",
        label: "Status",
        options: ["Active", "Inactive", "Retired"],
        defaultValue: "Active"
    }
];