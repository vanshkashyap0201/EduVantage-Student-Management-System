import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Attach JWT token to every API request
API.interceptors.request.use(
    (config) => {
        try {
            const authData = JSON.parse(
                localStorage.getItem("auth") || "null"
            );

            const token = authData?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token} `;
            }
        } catch (error) {
            console.error("Unable to read authentication data:", error);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Students
export const getStudents = () => API.get("/students");

export const createStudent = (values) =>
    API.post("/students", values);

export const deleteStudent = (studentId) =>
    API.delete(`/ students / ${studentId} `);

export const deleteStudents = (studentIds) =>
    API.delete("/students", {
        data: { studentIds },
    });

// Teachers
export const getTeachers = () => API.get("/teachers");

export const createTeacher = (values) =>
    API.post("/teachers", values);

export const deleteTeacher = (teacherId) =>
    API.delete(`/ teachers / ${teacherId} `);

export const deleteTeachers = (teacherIds) =>
    API.delete("/teachers", {
        data: { teacherIds },
    });

// Users
export const getUsers = () => API.get("/users");

export const loginUser = (values) =>
    API.post("/users/login", values);

export default API;