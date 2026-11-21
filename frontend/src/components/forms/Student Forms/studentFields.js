export const StudentFields = [
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
        type: "number",
        name: "age",
        label: "Age",
        placeholder: "e.g. 20",
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
        type: "select",
        name: "category",
        label: "Category",
        options: ["General", "OBC", "SC", "ST", "Other"]
    },
    {
        type: "tel",
        name: "phone",
        label: "Phone Number",
        placeholder: "e.g. 9876543210",
        required: true
    },
    {
        type: "file",
        name: "photo",
        label: "Photo",
        accept: "image/*"
    },
    {
        type: "text",
        name: "aadhaarNumber",
        label: "Aadhaar Number",
        placeholder: "1234 5678 9012",
        required: true
    },

    // Address
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
    },
    {
        type: "text",
        name: "address.city",
        label: "City",
        required: true
    },
    {
        type: "text",
        name: "address.district",
        label: "District",
    },
    {
        type: "text",
        name: "address.state",
        label: "State",
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
        required: true
    },

    // Academic
    {
        type: "text",
        name: "admissionNumber",
        label: "Admission Number",
        required: true
    },
    {
        type: "text",
        name: "rollNumber",
        label: "Roll Number",
        required: true
    },
    {
        type: "select",
        name: "course",
        label: "Course",
        options: ["BCA", "BBA", "MCA", "MBA"],
        required: true
    },
    {
        type: "select",
        name: "department",
        label: "Department",
        options: ["Computer Application", "Business Administration"],
        required: true
    },
    {
        type: "select",
        name: "semester",
        label: "Semester",
        options: [1, 2, 3, 4, 5, 6],
        required: true
    },
    {
        type: "select",
        name: "section",
        label: "Section",
        options: ["A", "B", "C", "D"],
        required: true
    },
    {
        type: "date",
        name: "admissionDate",
        label: "Admission Date",
        required: true
    },

    // Other
    {
        type: "select",
        name: "status",
        label: "Status",
        options: ["Active", "Inactive", "Graduated"],
        defaultValue: "Active"
    },
    {
        type: "select",
        name: "bloodGroup",
        label: "Blood Group",
        options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    }
];