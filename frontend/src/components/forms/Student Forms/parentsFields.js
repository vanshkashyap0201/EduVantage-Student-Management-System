export const ParentFields = [
    {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter parent name",
        required: true
    },
    {
        name: "relation",
        label: "Relation",
        type: "select",
        options: ["Father", "Mother", "Guardian"],
        required: true
    },
    {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "Enter phone number"
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email"
    },
    {
        name: "occupation",
        label: "Occupation",
        type: "text",
        placeholder: "Enter occupation"
    }
];