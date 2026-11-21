import { useState, useEffect } from "react";
import { Container, Button, Modal, Table, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../../components/common/backButton";
import { Heading } from "../../components/common/Heading";
import { FilterButtons } from "../../components/common/FilterButtons";
import { ListTable } from "../../components/table/listTable";
import { fetchStudentData, removeStudents } from "../../Store/dataThunk";


export const StudentList = () => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const { students, loading } = useSelector((state) => state.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (students.length === 0) {
            dispatch(fetchStudentData());
        }
    }, [dispatch, students.length]);

    // Toggle selection mode
    const handleRemoveClick = () => {
        setIsRemoving((prev) => !prev);
        setSelectedStudentIds([]);
        setDeleteError("");
        setShowConfirmModal(false);
    };

    // Select or deselect one student
    const handleSelectStudent = (studentId) => {
        setSelectedStudentIds((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    // Select or deselect all students
    const handleSelectAll = (checked) => {
        setSelectedStudentIds(
            checked ? students.map((student) => student._id) : []
        );
    };

    // Selected student records for the confirmation modal
    const selectedStudents = students.filter((student) =>
        selectedStudentIds.includes(student._id)
    );

    // Open confirmation modal
    const handleOpenConfirm = () => {
        if (selectedStudentIds.length === 0) return;

        setDeleteError("");
        setShowConfirmModal(true);
    };

    // Close modal without deleting
    const handleCancelDelete = () => {
        if (isDeleting) return;

        setShowConfirmModal(false);
        setDeleteError("");
    };

    // Delete selected students
    const handleConfirmDelete = async () => {
        if (selectedStudentIds.length === 0 || isDeleting) return;

        setIsDeleting(true);
        setDeleteError("");

        try {
            await dispatch(removeStudents(selectedStudentIds));

            setSelectedStudentIds([]);
            setIsRemoving(false);
            setShowConfirmModal(false);

        } catch (error) {
            console.error("Delete students error:", error);

            setDeleteError(
                !error.response
                    ? "Unable to connect to the server. Please check your connection and try again."
                    : error.response.data?.message ||
                    "Unable to delete students. Please try again."
            );
        } finally {
            setIsDeleting(false);
        }

    };

    const studentColumns = [
        {
            key: "rollNumber",
            label: "Roll Number",
            render: (student) => (
                <span className="roll-number">
                    {student.rollNumber}
                </span>
            ),
        },
        {
            key: "name",
            label: "Student Name",
            render: (student) => (
                <div className="student-info">
                    <div className="student-avatar">
                        {student.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="student-details">
                        <span className="student-name">
                            {student.name}
                        </span>
                        <span className="student-email">
                            {student.email}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: "phone",
            label: "Phone",
            render: (student) => (
                <span className="phone-number">
                    {student.phone}
                </span>
            ),
        },
        {
            key: "course",
            label: "Course",
        },
        {
            key: "department",
            label: "Department",
        },
        {
            key: "semester",
            label: "Semester",
        },
        {
            key: "section",
            label: "Section",
        },
        {
            key: "admissionNumber",
            label: "Admission Number",
            render: (student) => (
                <span className="admission-number">
                    {student.admissionNumber}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (student) => (
                <span
                    className={`status-badge ${student.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                        }`}
                >
                    {student.status}
                </span>
            ),
        },
    ];

    return (
        <>
            <BackButton />

            <Container fluid>
                <Row className="align-items-center">
                    <Col>
                        <Heading
                            title="Students"
                            description="Managing student records, enrolment and profiles"
                        />
                    </Col>

                    <Col xs="auto">
                        <div className="d-flex gap-2 flex-wrap justify-content-end">
                            {!isRemoving && (
                                <Button
                                    onClick={() =>
                                        navigate("/admin/students/add")
                                    }
                                    disabled={loading}
                                >
                                    + Add Student
                                </Button>
                            )}

                            <Button
                                variant={
                                    isRemoving ? "secondary" : "danger"
                                }
                                onClick={handleRemoveClick}
                                disabled={loading || isDeleting}
                            >
                                {isRemoving
                                    ? "Cancel Selection"
                                    : "Remove Student"}
                            </Button>

                            {isRemoving && (
                                <Button
                                    variant="danger"
                                    onClick={handleOpenConfirm}
                                    disabled={
                                        selectedStudentIds.length === 0 ||
                                        loading ||
                                        isDeleting
                                    }
                                >
                                    Remove ({selectedStudentIds.length})
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* <FilterButtons /> */}

                <ListTable
                    columns={studentColumns}
                    data={students}
                    loading={loading}
                    selectionEnabled={isRemoving}
                    selectedIds={selectedStudentIds}
                    onSelectRow={handleSelectStudent}
                    onSelectAll={handleSelectAll}
                />
            </Container>

            {/* Delete confirmation modal */}
            <Modal
                show={showConfirmModal}
                onHide={handleCancelDelete}
                centered
                size="lg"
                backdrop={isDeleting ? "static" : true}
                keyboard={!isDeleting}
            >
                <Modal.Header closeButton={!isDeleting}>
                    <Modal.Title>
                        Confirm Student Removal
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {deleteError && (
                        <Alert
                            variant="danger"
                            dismissible
                            onClose={() => setDeleteError("")}
                        >
                            {deleteError}
                        </Alert>
                    )}

                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{selectedStudents.length}</strong>{" "}
                        selected student(s)? This action cannot be undone.
                    </p>

                    <Table responsive bordered hover>
                        <thead>
                            <tr>
                                <th>Roll Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                            </tr>
                        </thead>

                        <tbody>
                            {selectedStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.rollNumber}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCancelDelete}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleConfirmDelete}
                        disabled={
                            selectedStudentIds.length === 0 ||
                            isDeleting
                        }
                    >
                        {isDeleting
                            ? "Deleting..."
                            : `Delete ${selectedStudentIds.length} Student(s)`}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};