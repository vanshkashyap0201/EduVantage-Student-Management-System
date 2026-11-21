import { useEffect, useState } from "react";
import { Container, Row, Col, } from "react-bootstrap";
import { FaUsers, FaChalkboardTeacher, FaBook, FaBuilding, FaUserCheck, FaUserTimes, FaUserPlus, FaClipboardCheck, FaBullhorn, } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../CSSs/adminDashboard.css";
import { fetchStudentData, fetchTeacherData } from "../../Store/dataThunk";

export const AdminDashboard = () => {

    const { students, teachers } = useSelector((state) => state.data)

    const dispatch = useDispatch();

    useEffect(() => {
        if (students.length === 0) {
            dispatch(fetchStudentData())
        }
        if (teachers.length === 0) {
            dispatch(fetchTeacherData())
        }
    }, []);

    const totalStudents = students.length;
    const totalTeachers = teachers.length;

    const activeStudents = students.filter((student) => student.status === "Active").length;

    const inactiveStudents = students.filter((student) => student.status === "Inactive").length;

    const totalCourses = new Set(
        students
            .map((student) => student.course)
            .filter(Boolean)
    ).size;

    const totalDepartments = new Set(
        students
            .map((student) => student.department)
            .filter(Boolean)
    ).size;


    const stats = [
        {
            title: "TOTAL STUDENTS",
            value: totalStudents,
            description: "Students registered",
            icon: <FaUsers />,
            className: "students-card",
            path: "/admin/students",
        },
        {
            title: "TOTAL TEACHERS",
            value: totalTeachers,
            description: "Teachers registered",
            icon: <FaChalkboardTeacher />,
            className: "teachers-card",
            path: "/admin/teachers",
        },
        {
            title: "TOTAL COURSES",
            value: totalCourses,
            description: "Courses available",
            icon: <FaBook />,
            className: "courses-card",
            path: "/admin/courses",
        },
        {
            title: "TOTAL DEPARTMENTS",
            value: totalDepartments,
            description: "Departments available",
            icon: <FaBuilding />,
            className: "departments-card",
            path: "/admin/departments",
        },
        {
            title: "ACTIVE STUDENTS",
            value: activeStudents,
            description: "Currently active",
            icon: <FaUserCheck />,
            className: "active-card",
            // path: "/admin-students?status=Active",
        },
        {
            title: "INACTIVE STUDENTS",
            value: inactiveStudents,
            description: "Currently inactive",
            icon: <FaUserTimes />,
            className: "inactive-card",
            // path: "/admin-students?status=Inactive",
        },
    ];

    const quickActions = [
        {
            title: "Add Student",
            icon: <FaUserPlus />,
            path: "/admin/students/add"
        },
        {
            title: "Add Teacher",
            icon: <FaChalkboardTeacher />,
            path: "/admin/teachers/add"
        },
        {
            title: "Mark Attendance",
            icon: <FaClipboardCheck />,
            path: "/attendance/mark"
        },
        {
            title: "Add Notice",
            icon: <FaBullhorn />,
            path: "/notices/add"
        },
    ];


    return (
        <Container fluid className="admin-dashboard">
            <Row className="stats-grid">
                {stats.map((stat) => (
                    <Col
                        key={stat.title}
                        xs={12}
                        md={6}
                        lg={4}
                    >
                        <NavLink
                            key={stat.title}
                            to={stat.path}
                            className="menu-link"
                        >
                            <Container className={`stat-card ${stat.className}`}>
                                <div className="stat-content">
                                    <div className="stat-title">
                                        {stat.title}
                                    </div>

                                    <div className="stat-value">
                                        {stat.value}
                                    </div>

                                    <div className="stat-description">
                                        {stat.description}
                                    </div>
                                </div>

                                <div className="stat-icon">
                                    {stat.icon}
                                </div>
                            </Container>
                        </NavLink>
                    </Col>
                ))}
            </Row>

            <Container className="quick-actions">
                <h5>
                    Quick Actions
                </h5>

                <Row className="actions-grid">
                    {quickActions.map((action) => (
                        <Col
                            key={action.title}
                            xs={12}
                            sm={6}
                            lg={3}
                        >
                            <NavLink
                                key={action.title}
                                to={action.path}
                                className="menu-link"
                            >
                                <button className="action-card">
                                    <div className="action-icon">
                                        {action.icon}
                                    </div>

                                    <span>
                                        {action.title}
                                    </span>
                                </button>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};