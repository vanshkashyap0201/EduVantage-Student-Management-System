import { useState, useEffect } from "react";
import { Container, Button, Modal, Table, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../../components/common/backButton";
import { Heading } from "../../components/common/Heading";
import { FilterButtons } from "../../components/common/FilterButtons";
import { ListTable } from "../../components/table/listTable";
import { fetchTeacherData, removeTeachers } from "../../Store/dataThunk";

export const TeacherList = () => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { teachers, loading } = useSelector(
        (state) => state.data
    );

    useEffect(() => {
        if (teachers.length === 0) {
            dispatch(fetchTeacherData());
        }
    }, [dispatch, teachers.length])

    // Get selected teacher records
    const selectedTeachers = teachers.filter((teacher) =>
        selectedTeacherIds.includes(teacher._id)
    );

    // Enable or cancel selection mode
    const handleRemoveClick = () => {
        setIsRemoving((prev) => !prev);
        setSelectedTeacherIds([]);
        setDeleteError("");
        setShowConfirmModal(false);
    };

    // Select or deselect an individual teacher
    const handleSelectTeacher = (teacherId) => {
        setSelectedTeacherIds((prev) =>
            prev.includes(teacherId)
                ? prev.filter((id) => id !== teacherId)
                : [...prev, teacherId]
        );
    };

    // Select or deselect all teachers
    const handleSelectAll = (checked) => {
        setSelectedTeacherIds(
            checked ? teachers.map((teacher) => teacher._id) : []
        );
    };

    // Open confirmation popup
    const handleOpenConfirm = () => {
        if (selectedTeacherIds.length === 0) return;

        setDeleteError("");
        setShowConfirmModal(true);
    };

    // Cancel deletion and return to selection
    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setDeleteError("");
    };

    // Confirm and delete selected teachers
    const handleConfirmDelete = async () => {
        if (selectedTeacherIds.length === 0) return;

        setDeleteError("");

        try {

            await dispatch(removeTeachers(selectedTeacherIds));

            setSelectedTeacherIds([]);
            setIsRemoving(false);
            setShowConfirmModal(false);
        } catch (error) {
            setDeleteError(
                !error.response
                    ? "Unable to connect to the server. Please check your connection and try again."
                    : error.response.data?.message ||
                    "Unable to delete teachers. Please try again."
            );
        }
    };

    const teacherColumns = [
        {
            key: "employeeId",
            label: "Employee ID",
            render: (teacher) => (
                <span className="roll-number">
                    {teacher.employeeId}
                </span>
            )
        },
        {
            key: "name",
            label: "Teacher Name",
            render: (teacher) => (
                <div className="student-info">
                    <div className="student-avatar">
                        {teacher.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="student-details">
                        <span className="student-name">
                            {teacher.name}
                        </span>

                        <span className="student-email">
                            {teacher.email}
                        </span>
                    </div>
                </div>
            )
        },
        {
            key: "phone",
            label: "Phone",
            render: (teacher) => (
                <span className="phone-number">
                    {teacher.phone}
                </span>
            )
        },
        { key: "department", label: "Department" },
        { key: "designation", label: "Designation" },
        { key: "qualification", label: "Qualification" },
        {
            key: "experience",
            label: "Experience",
            render: (teacher) => (
                <span>{teacher.experience} years</span>
            )
        },
        { key: "specialization", label: "Specialization" },
        {
            key: "status",
            label: "Status",
            render: (teacher) => (
                <span
                    className={`status-badge ${teacher.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                        } `}
                >
                    {teacher.status}
                </span>
            )
        }
    ];

    return (
        <>
            <BackButton />

            <Container fluid>
                <Row className="align-items-center ">
                    {/* Left side: Heading */}
                    <Col sm={6}>
                        <Heading
                            title="Teachers"
                            description="Managing teacher records, profiles and professional details"
                        />
                    </Col>

                    {/* Right side: Action buttons */}
                    <Col sm={6}>
                        <div className="d-flex gap-2 flex-wrap justify-content-end">
                            {!isRemoving && (
                                <Button
                                    onClick={() => navigate("/admin/teachers/add")}
                                >
                                    + Add Teacher
                                </Button>
                            )}

                            <Button
                                variant={isRemoving ? "secondary" : "danger"}
                                onClick={handleRemoveClick}
                                disabled={loading}
                            >
                                {isRemoving ? "Cancel Selection" : "Remove Teacher"}
                            </Button>

                            {isRemoving && (
                                <Button
                                    variant="danger"
                                    disabled={
                                        selectedTeacherIds.length === 0 || loading
                                    }
                                    onClick={handleOpenConfirm}
                                >
                                    Remove ({selectedTeacherIds.length})
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* <FilterButtons /> */}

                <ListTable
                    columns={teacherColumns}
                    data={teachers}
                    loading={loading}
                    selectionEnabled={isRemoving}
                    selectedIds={selectedTeacherIds}
                    onSelectRow={handleSelectTeacher}
                    onSelectAll={handleSelectAll}
                />
            </Container >

            {/* Delete Confirmation Modal */}
            <Modal Modal
                show={showConfirmModal}
                onHide={handleCancelDelete}
                centered
                size="lg"
                backdrop={loading ? "static" : true}
                keyboard={!loading
                }
            >
                <Modal.Header closeButton={!loading}>
                    <Modal.Title>
                        Confirm Teacher Removal
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {deleteError && (
                        <Alert variant="danger">
                            {deleteError}
                        </Alert>
                    )}

                    <p>
                        Are you sure you want to remove{" "}
                        <strong>
                            {selectedTeachers.length} teacher(s)
                        </strong>
                        ?
                    </p>

                    <p className="text-muted">
                        Review the selected records before confirming.
                        This action deletes the records from the database.
                    </p>

                    <div className="table-responsive">
                        <Table bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                </tr>
                            </thead>

                            <tbody>
                                {selectedTeachers.map((teacher) => (
                                    <tr key={teacher._id}>
                                        <td>{teacher.employeeId}</td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        onClick={handleCancelDelete}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirmDelete}
                        disabled={
                            selectedTeachers.length === 0 || loading
                        }
                    >
                        {loading
                            ? "Removing..."
                            : "Remove Teachers"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};