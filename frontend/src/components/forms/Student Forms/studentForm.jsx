import { useFormik } from "formik"
import { useState } from "react";
import { StudentFields } from "./studentFields";
import { BasicInputFields } from "../BasicInputFields/basicInputFields";
import { ParentFields } from "./parentsFields";
import { Container, Form, Row, Col, Modal, Button } from "react-bootstrap"
import { ParentInputFields } from "../ParentInputFields/parentInputFields";
import API from "../../../services/api";
import "./studentForm.css"

export const StudentForm = () => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const initialStates = {
        name: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        age: "",
        nationality: "Indian",
        category: "",
        phone: "",
        photo: "",
        aadhaarNumber: "",

        address: {
            houseNo: "",
            street: "",
            area: "",
            city: "",
            district: "",
            state: "",
            country: "India",
            pincode: ""
        },

        admissionNumber: "",
        rollNumber: "",
        course: "",
        department: "",
        semester: "",
        section: "",
        admissionDate: "",

        parents: [
            {
                name: "",
                relation: "",
                phone: "",
                email: "",
                occupation: ""
            }
        ],

        status: "Active",
        bloodGroup: ""
    };

    const formik = useFormik({
        initialValues: initialStates,
        onSubmit: async (values) => {
            try {
                const response = await API.post("/students", values);

                console.log("Student added:", response.data);

                alert("Student added successfully");
            } catch (error) {
                console.error("Error adding student:", error);

                alert(
                    error.response?.data?.message ||
                    "Failed to add student"
                );
            }
        }
    })

    return (
        <>
            <Container className="student-form-container">
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="student-form-row">
                        {
                            StudentFields.map((field, index) => (
                                <BasicInputFields
                                    key={index}
                                    field={field}
                                    formik={formik}
                                />
                            ))
                        }

                        {/* Parent / Guardian Details */}
                        <div className="parents-section">

                            <div className="parents-section-header">
                                <h5>Parent / Guardian Details</h5>

                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => {
                                        formik.setFieldValue("parents", [
                                            ...formik.values.parents,
                                            {
                                                name: "",
                                                relation: "",
                                                phone: "",
                                                email: "",
                                                occupation: ""
                                            }
                                        ]);
                                    }}
                                >
                                    + Add Parent
                                </Button>
                            </div>

                            {formik.values.parents.map((parent, parentIndex) => (

                                <div className="parent-card" key={parentIndex}>

                                    <div className="parent-card-header">
                                        <h6>Parent / Guardian {parentIndex + 1}</h6>

                                        {formik.values.parents.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    const updatedParents =
                                                        formik.values.parents.filter(
                                                            (_, index) => index !== parentIndex
                                                        );

                                                    formik.setFieldValue(
                                                        "parents",
                                                        updatedParents
                                                    );
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>

                                    <Row className="student-form-row">

                                        {ParentFields.map((field, fieldIndex) => (
                                            <ParentInputFields
                                                key={fieldIndex}
                                                field={field}
                                                fieldIndex={fieldIndex}
                                                parent={parent}
                                                parentIndex={parentIndex}
                                                formik={formik}
                                            />
                                        ))}

                                    </Row>
                                </div>
                            ))}
                        </div>

                    </Row>

                    <div className="student-form-submit">
                        <Button type="button" variant="secondary"
                            onClick={() => setShowCancelModal(true)}
                        >
                            Cancel
                        </Button>

                        <button type="submit" className="btn btn-primary">
                            Add Student
                        </button>
                    </div>
                </Form>
                <Modal
                    show={showCancelModal}
                    onHide={() => setShowCancelModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Form</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to cancel?
                        <br />
                        All the entered information will be lost.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowCancelModal(false)}
                        >
                            No
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => {
                                formik.resetForm();
                                setShowCancelModal(false);
                            }}
                        >
                            Yes, Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}