import {
    FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaBook, FaBuilding, FaClipboardCheck, FaMoneyBillWave,
    FaDesktop, FaBullhorn, FaChartLine, FaCog, FaSignOutAlt, FaGraduationCap, FaChevronLeft,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import "./sidebar.css";

export const Sidebar = ({ collapsed, setCollapsed }) => {
    const { user, profile } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    const displayName = profile?.name || user?.email || "User";
    const displayRole = user?.role || "User";

    const initials = displayName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const adminMenu = [
        {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/",
        },
        {
            name: "Students",
            icon: <FaUsers />,
            path: "/students",
        },
        {
            name: "Teachers",
            icon: <FaChalkboardTeacher />,
            path: "/teachers",
        },
        // {
        //     name: "Courses",
        //     icon: <FaBook />,
        //     path: "/courses",
        // },
        // {
        //     name: "Departments",
        //     icon: <FaBuilding />,
        //     path: "/departments",
        // },
        // {
        //     name: "Attendance",
        //     icon: <FaClipboardCheck />,
        //     path: "/attendance",
        // },
        // {
        //     name: "Fees",
        //     icon: <FaMoneyBillWave />,
        //     path: "/fees",
        // },
        // {
        //     name: "Examinations",
        //     icon: <FaDesktop />,
        //     path: "/examinations",
        // },
        // {
        //     name: "Notices",
        //     icon: <FaBullhorn />,
        //     path: "/notices",
        //     badge: 3,
        // },
        // {
        //     name: "Reports",
        //     icon: <FaChartLine />,
        //     path: "/reports",
        // },
        // {
        //     name: "Settings",
        //     icon: <FaCog />,
        //     path: "/settings",
        // },
    ]

    const teacherMenu = [
        {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/",
        },
        {
            name: "Students",
            icon: <FaUsers />,
            path: "/students",
        },
    ]

    const studentMenu = [
        {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/",
        },
    ]

    const mainMenu = user?.role === "Admin"
        ? adminMenu
        : user?.role === "Teacher"
            ? teacherMenu
            : studentMenu;

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            {/* Logo */}
            <div className="sidebar-header">

                <div className="brand">
                    <div className="brand-icon">
                        <FaGraduationCap />
                    </div>

                    <div className="brand-text">
                        <div className="brand-name">
                            EduVantage
                        </div>

                        <div className="brand-subtitle">
                            STUDENT MANAGEMENT
                        </div>
                    </div>
                </div>

                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaChevronLeft />
                </button>

            </div>


            {/* Sidebar Content */}
            <div className="sidebar-content">

                {/* Main Menu */}
                <div className="menu-section">

                    <div className="menu-title">
                        MAIN MENU
                    </div>

                    <nav className="sidebar-menu">

                        {mainMenu.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className="menu-link"
                            >
                                <div className="menu-item">

                                    <span className="menu-icon">
                                        {item.icon}
                                    </span>

                                    <span className="menu-text">
                                        {item.name}
                                    </span>

                                    {item.badge && (
                                        <span className="menu-badge">
                                            {item.badge}
                                        </span>
                                    )}

                                </div>
                            </NavLink>
                        ))}

                    </nav>

                </div>


                {/* Account */}
                <div className="account-section">

                    <div className="menu-title">
                        ACCOUNT
                    </div>

                    <div
                        className="menu-item logout"
                        onClick={handleLogout}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleLogout();
                            }
                        }}
                    >
                        <span className="menu-icon">
                            <FaSignOutAlt />
                        </span>

                        <span className="menu-text">
                            Logout
                        </span>
                    </div>

                </div>

            </div>

            {/* User Profile */}
            <div className="sidebar-profile">

                <div className="sidebar-avatar">
                    {profile?.photo ? (
                        <img src={profile.photo} alt={displayName} />
                    ) : (
                        initials
                    )}
                </div>

                <div className="sidebar-user-details">
                    <div className="sidebar-user-name">
                        {displayName}
                    </div>

                    <div className="sidebar-user-role">
                        {displayRole}
                    </div>
                </div>

            </div>

        </aside>
    );
};