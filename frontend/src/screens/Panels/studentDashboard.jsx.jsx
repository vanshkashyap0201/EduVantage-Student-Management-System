import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import { FaCalendarCheck, FaRupeeSign, FaBookOpen, FaBell, FaArrowRight, FaBullhorn, FaLink, } from "react-icons/fa";
import "../CSSs/studentDashboard.css";

export const StudentDashboard = () => {

    const dashboardActions = [
        {
            title: "Check Attendance",
            description: "View your attendance and subject-wise records.",
            icon: FaCalendarCheck,
            color: "green",
        },
        {
            title: "Fees",
            description: "Check fee details, payments and dues.",
            icon: FaRupeeSign,
            color: "blue",
        },
        {
            title: "Courses",
            description: "View your enrolled courses and syllabus.",
            icon: FaBookOpen,
            color: "purple",
        },
        {
            title: "Notices",
            description: "Get the latest college notices and updates.",
            icon: FaBell,
            color: "orange",
        },
    ];

    const recentNotices = [
        {
            title: "Examination Form Submission Deadline",
            description: "Last date to submit examination form is 25 Oct 2026.",
            date: "18 Oct 2026",
            color: "red",
        },
        {
            title: "Class Test Schedule",
            description: "Class test for BCA 3rd semester will be held from 22 Oct.",
            date: "16 Oct 2026",
            color: "green",
        },
        {
            title: "Fee Payment Reminder",
            description: "Last date for fee payment is 20 Oct 2026.",
            date: "14 Oct 2026",
            color: "orange",
        },
    ];

    const courses = [
        {
            name: "BCA",
            semester: 3,
            status: "Ongoing",
        },
        {
            name: "Computer Applications",
            semester: 3,
            status: "Ongoing",
        },
    ];

    return (
        <div className="student-dashboard">
            {/* Welcome Section */}
            {/* <div className="student-welcome">
                <div>
                    <h2>Hello, Student! 👋</h2>
                    <p>
                        Good to see you again. Here's what's happening
                        with your academic journey.
                    </p>
                </div>

                <div className="student-welcome-quote">
                    "Small steps every day
                    <br />
                    lead to big results."
                </div>
            </div> */}

            {/* Main Action Cards */}
            <Row className="g-4 student-action-row">
                {dashboardActions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Col xs={12} sm={6} xl={3} key={action.title}>
                            <Card
                                className={`student-action-card ${action.color}`}
                            >
                                <Card.Body>
                                    <div className="student-action-icon">
                                        <Icon />
                                    </div>

                                    <h5>{action.title}</h5>

                                    <p>{action.description}</p>

                                    <FaArrowRight className="student-action-arrow" />
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            {/* Dashboard Details */}
            <Row className="g-4 student-dashboard-details">
                {/* Recent Notices and Courses */}
                <Col xs={12} xl={6}>
                    {/* <Card className="student-panel-card notices-panel">
                        <Card.Body>
                            <div className="student-panel-heading">
                                <h5>
                                    <FaBullhorn />
                                    Recent Notices
                                </h5>

                                <button
                                    type="button"
                                    className="student-view-link"
                                >
                                    View All <FaArrowRight />
                                </button>
                            </div>

                            <div className="student-notices-list">
                                {recentNotices.map((notice) => (
                                    <div
                                        className="student-notice-item"
                                        key={notice.title}
                                    >
                                        <span
                                            className={`notice-dot ${notice.color}`}
                                        />

                                        <div className="student-notice-content">
                                            <div className="student-notice-top">
                                                <h6>{notice.title}</h6>
                                                <span>{notice.date}</span>
                                            </div>

                                            <p>{notice.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card> */}

                    <Card className="student-panel-card student-courses-panel">
                        <Card.Body>
                            <div className="student-panel-heading">
                                <h5>
                                    <FaBookOpen />
                                    My Courses
                                </h5>

                                <button
                                    type="button"
                                    className="student-view-link"
                                >
                                    View All <FaArrowRight />
                                </button>
                            </div>

                            <div className="student-course-table">
                                <Table responsive className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>Course Name</th>
                                            <th>Semester</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course.name}>
                                                <td>{course.name}</td>
                                                <td>{course.semester}</td>
                                                <td>
                                                    <Badge
                                                        pill
                                                        className="course-status"
                                                    >
                                                        {course.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Attendance */}
                {/* <Col xs={12} xl={6}>
                    <Card className="student-panel-card attendance-panel">
                        <Card.Body>
                            <div className="student-panel-heading">
                                <h5>
                                    <FaCalendarCheck />
                                    Your Attendance
                                </h5>

                                <button
                                    type="button"
                                    className="student-view-link"
                                >
                                    View Details <FaArrowRight />
                                </button>
                            </div>

                            <div className="student-attendance-content">
                                <div
                                    className="attendance-circle"
                                    role="img"
                                    aria-label="92 percent attendance"
                                >
                                    <div className="attendance-circle-inner">
                                        <h3>92%</h3>
                                        <span>Present</span>
                                    </div>
                                </div>

                                <div className="attendance-legend">
                                    <div>
                                        <span className="legend-dot present" />
                                        <span>Present</span>
                                        <strong>46</strong>
                                    </div>

                                    <div>
                                        <span className="legend-dot absent" />
                                        <span>Absent</span>
                                        <strong>4</strong>
                                    </div>

                                    <div>
                                        <span className="legend-dot total" />
                                        <span>Total</span>
                                        <strong>50</strong>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
        </div>
    );
};

export default StudentDashboard;