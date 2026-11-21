import { Col, Form } from "react-bootstrap";
import "./basicInputFields.css";

export const BasicInputFields = ({ field, formik }) => {

    const getDOBMaxDate = () => {
        const date = new Date();

        date.setFullYear(date.getFullYear() - 1);

        return date.toISOString().split("T")[0];
    };

    const getToday = () => {
        return new Date().toISOString().split("T")[0];
    };

    switch (field.type) {

        case "text":
        case "email":
        case "number":
        case "tel":
            return (
                <Col
                    lg={4}
                    md={6}
                    sm={12}
                    className="basic-input-field"
                >
                    <Form.Label>
                        {field.label}
                        {field.required && (
                            <span className="required">*</span>
                        )}
                    </Form.Label>

                    <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        {...formik.getFieldProps(field.name)}
                    />
                </Col>
            );

        case "select":
            return (
                <Col
                    lg={4}
                    md={6}
                    sm={12}
                    className="basic-input-field"
                >
                    <Form.Label>
                        {field.label}
                        {field.required && (
                            <span className="required">*</span>
                        )}
                    </Form.Label>

                    <Form.Select
                        required={field.required}
                        {...formik.getFieldProps(field.name)}
                    >
                        <option value="">Select</option>

                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            );

        case "radio":
            return (
                <Col
                    lg={4}
                    md={6}
                    sm={12}
                    className="basic-input-field"
                >
                    <Form.Label>
                        {field.label}
                        {field.required && (
                            <span className="required">*</span>
                        )}
                    </Form.Label>

                    {field.options.map((option) => (
                        <Form.Check
                            key={option}
                            type="radio"
                            inline
                            label={option}
                            name={field.name}
                            value={option}
                            required={field.required}
                            checked={
                                formik.values[field.name] === option
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    ))}
                </Col>
            );

        case "date":
            return (
                <Col
                    lg={4}
                    md={6}
                    sm={12}
                    className="basic-input-field"
                >
                    <Form.Label>
                        {field.label}
                        {field.required && (
                            <span className="required">*</span>
                        )}
                    </Form.Label>

                    <Form.Control
                        type="date"
                        required={field.required}
                        max={
                            field.name === "dateOfBirth"
                                ? getDOBMaxDate()
                                : field.name === "admissionDate"
                                    ? getToday()
                                    : undefined
                        }
                        {...formik.getFieldProps(field.name)}
                    />
                </Col>
            );

        default:
            return null;
    }
};