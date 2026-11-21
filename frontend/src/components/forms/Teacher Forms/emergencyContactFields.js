export const EmergencyContactFields = [
    {
        name: "name",
        label: "Contact Name",
        type: "text",
        placeholder: "e.g. John Doe",
        required: true
    },
    {
        name: "relation",
        label: "Relation",
        type: "select",
        options: ["Father", "Mother", "Spouse", "Sibling", "Guardian", "Other"],
        required: true
    },
    {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "e.g. 9876543210",
        required: true
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "e.g. john@example.com"
    },
    {
        name: "occupation",
        label: "Occupation",
        type: "text",
        placeholder: "e.g. Teacher"
    }
];