import {
    Container,
    Navbar,
    Nav,
    Form,
    InputGroup,
    Dropdown,
    Badge,
} from "react-bootstrap";
import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import "./Topbar.css";

export const Topbar = () => {
    const [search, setSearch] = useState("");

    const { user, profile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const displayName = profile?.name || user?.email || "User";
    const displayRole = user?.role || "User";

    const initials = displayName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    const isSearching = search.length > 0;

    return (
        <Navbar className="topbar bg-white border-bottom">
            <Container fluid className="px-4">

                {/* Page Heading */}
                <Navbar.Brand
                    className={`page-heading ${isSearching ? "hide-heading" : ""
                        }`}
                >
                    <h5 className="mb-0 fw-semibold">
                        Dashboard
                    </h5>

                    <small className="text-secondary">
                        Home
                    </small>
                </Navbar.Brand>


                {/* Right Side */}
                <Nav
                    className={`topbar-right ${isSearching ? "searching" : ""
                        }`}
                >

                    {/* Search */}
                    <InputGroup className="search-box">

                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>

                        <Form.Control
                            type="search"
                            placeholder="Search students, teachers..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            autoFocus={isSearching}
                        />

                    </InputGroup>


                    {/* Notification */}
                    <div
                        className={`notification position-relative ${isSearching ? "hide-item" : ""
                            }`}
                    >
                        <FaBell size={19} />

                        <Badge
                            bg="danger"
                            pill
                            className="notification-count"
                        >
                            3
                        </Badge>
                    </div>


                    {/* Profile */}
                    <Dropdown
                        className={
                            isSearching ? "hide-item" : ""
                        }
                    >
                        <Dropdown.Toggle
                            variant="light"
                            className="profile-toggle d-flex align-items-center border-0"
                        >
                            <div className="profile-avatar">
                                {profile?.photo ? (
                                    <img src={profile.photo} alt={displayName} />
                                ) : (
                                    initials
                                )}
                            </div>

                            <div className="profile-details text-start ms-2">
                                <div className="profile-name">
                                    {displayName}
                                </div>

                                <small className="text-secondary">
                                    {displayRole}
                                </small>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>

                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item
                                className="text-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Nav>

            </Container>
        </Navbar>
    );
};