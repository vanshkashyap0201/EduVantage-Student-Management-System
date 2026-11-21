import { useState } from "react";
import { Container, Card, Form, Button, InputGroup, } from "react-bootstrap";
import { FaGraduationCap, FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { loginUser } from "../../services/api";
import { setCredentials } from "../../Store/authSlice";
import "./login.css";

const loginSchema = yup.object({
    identifier: yup
        .string()
        .trim()
        .email("Please enter a valid email address")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required"),
});

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            await loginSchema.validate(formData, {
                abortEarly: false,
            });

            setErrors({});

            const response = await loginUser({
                email: formData.identifier.trim().toLowerCase(),
                password: formData.password,
            });

            const { token, user, profile } = response.data;

            // Save authentication details in Redux.
            // authSlice saves these details to localStorage.
            dispatch(
                setCredentials({
                    token,
                    user,
                    profile: profile ?? null,
                })
            );

            // Redirect according to the user's role.
            switch (user.role) {
                case "Admin":
                    navigate("/admin-dashboard", { replace: true });
                    break;

                case "Teacher":
                    navigate("/teacher-dashboard", { replace: true });
                    break;

                case "Student":
                    navigate("/student-dashboard", { replace: true });
                    break;

                default:
                    dispatch({ type: "auth/logout" });
                    alert("Invalid user role.");
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                const newErrors = {};

                error.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });

                setErrors(newErrors);
            } else {
                console.error("Login error:", error);

                alert(
                    error.response?.data?.message ||
                    "Unable to log in. Please try again."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container
            fluid
            className="login-page d-flex justify-content-center align-items-center"
        >
            <Card className="login-card border-0">
                <Card.Body className="login-card-body">
                    <div className="login-header text-center">
                        <div className="login-logo">
                            <FaGraduationCap />
                        </div>

                        <h1 className="login-brand">
                            Edu<span>Vantage</span>
                        </h1>

                        <p className="login-subtitle">
                            Student Management System
                        </p>

                        <p className="login-description">
                            Sign in to your account
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className="login-form-group">
                            <Form.Label>Email</Form.Label>

                            <InputGroup className="login-input-group">
                                <InputGroup.Text>
                                    <FaUser />
                                </InputGroup.Text>

                                <Form.Control
                                    type="email"
                                    name="identifier"
                                    placeholder="Enter your email"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    isInvalid={!!errors.identifier}
                                    autoComplete="username"
                                />
                            </InputGroup>

                            {errors.identifier && (
                                <div className="login-error">
                                    {errors.identifier}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="login-form-group">
                            <Form.Label>Password</Form.Label>

                            <InputGroup className="login-input-group">
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>

                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="button"
                                    variant="light"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />}
                                </Button>
                            </InputGroup>

                            {errors.password && (
                                <div className="login-error">
                                    {errors.password}
                                </div>
                            )}

                            <div className="text-end mt-2">
                                <button
                                    type="button"
                                    className="forgot-password-link"
                                    onClick={() =>
                                        console.log("Forgot password clicked")
                                    }
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="login-submit-btn w-100"
                            disabled={isSubmitting}
                        >
                            <FaSignInAlt className="me-2" />
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                    </Form>

                    <div className="login-divider">
                        <span>or</span>
                    </div>

                    <p className="login-footer text-center">
                        Contact your administrator if you need an account.
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};