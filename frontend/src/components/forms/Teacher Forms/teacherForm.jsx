import { useFormik } from "formik";
import { useState } from "react";
import { Container, Form, Row, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { EmergencyContactFields } from "./emergencyContactFields";
import { ParentInputFields } from "../ParentInputFields/parentInputFields";
import { TeacherFields } from "./teacherFields";
import { BasicInputFields } from "../BasicInputFields/basicInputFields";
import { addTeacher } from "../../../Store/dataThunk";
import "./teacherForm.css";

export const TeacherForm = () => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const dispatch = useDispatch();

    const initialStates = {
        name: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        nationality: "Indian",
        phone: "",
        aadhaarNumber: "",

        address: {
            houseNo: "",
            street: "",
            area: "",
            city: "",
            district: "",
            state: "",
            country: "India",
            pincode: "",
        },

        employeeId: "",
        department: "",
        designation: "",
        qualification: "",
        specialization: "",
        experience: 0,
        joiningDate: "",

        role: "Teacher",
        status: "Active",

        emergencyContact: {
            name: "",
            relation: "",
            phone: "",
            email: "",
            occupation: "",
        },
    };

    const formik = useFormik({
        initialValues: initialStates,

        onSubmit: async (values, { resetForm }) => {
            console.log("Form submitted:", values);

            try {
                await dispatch(addTeacher(values));
                alert("Teacher added successfully!");
                resetForm();
            } catch (error) {
                console.error("Submit error:", error);
                alert(error.response?.data?.message || error.message);
            }
        },
    });

    return (
        <Container className="teacher-form-container">
            <Form onSubmit={formik.handleSubmit}>
                <Row className="teacher-form-row">
                    {/* Teacher Details */}
                    {TeacherFields.map((field) => (
                        <BasicInputFields
                            key={field.name}
                            field={field}
                            formik={formik}
                        />
                    ))}


                    {/* Emergency Contact Details */}
                    <div className="parents-section">
                        <div className="parents-section-header">
                            <h5>Emergency Contact Details</h5>
                        </div>

                        <div className="parent-card">
                            <div className="parent-card-header">
                                <h6>Emergency Family Contact</h6>
                            </div>

                            <Row className="teacher-form-row">
                                {EmergencyContactFields.map((field) => (
                                    <ParentInputFields
                                        key={field.name}
                                        field={field}
                                        formik={formik}
                                        namePrefix="emergencyContact"
                                    />
                                ))}
                            </Row>
                        </div>
                    </div>
                </Row>

                {/* Form Actions */}
                <div className="teacher-form-submit">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setShowCancelModal(true)}
                    >
                        Cancel
                    </Button>


                    {/* Thiis button is not working */}
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Adding..." : "Add Teacher"}
                    </Button>
                </div>
            </Form>

            {/* Cancel Confirmation Modal */}
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
    );
};