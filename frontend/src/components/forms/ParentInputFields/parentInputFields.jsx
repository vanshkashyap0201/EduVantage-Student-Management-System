
import { Col, Form } from "react-bootstrap";
import "./parentInputFields.css";

export const ParentInputFields = ({
    field,
    fieldIndex,
    parent,
    parentIndex,
    formik,
    namePrefix
}) => {
    const fieldName = namePrefix
        ? `${namePrefix}.${field.name}`
        : `parents[${parentIndex}].${field.name}`;

    const value = namePrefix
        ? formik.getFieldProps(fieldName).value ?? ""
        : parent?.[field.name] ?? "";

    const options = field.options || [];

    return (
        <Col
            key={fieldIndex ?? field.name}
            lg={4}
            md={6}
            sm={12}
            className="parent-input-field"
        >
            <Form.Label>
                {field.label}
                {field.required && (
                    <span className="required">*</span>
                )}
            </Form.Label>

            {field.type === "select" ? (
                <Form.Select
                    name={fieldName}
                    value={value}
                    required={field.required}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Select</option>

                    {options
                        .filter((option) => {
                            // Filter duplicate parent relationships
                            // only for Student parent fields.
                            if (namePrefix) return true;
                            if (option === "Guardian") return true;

                            return !formik.values.parents.some(
                                (p, index) =>
                                    index !== parentIndex &&
                                    p.relation === option
                            );
                        })
                        .map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                </Form.Select>
            ) : (
                <Form.Control
                    type={field.type}
                    name={fieldName}
                    placeholder={field.placeholder}
                    value={value}
                    required={field.required}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            )}
        </Col>
    );
};