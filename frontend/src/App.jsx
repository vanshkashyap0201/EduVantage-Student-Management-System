import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HomeRedirect } from "./components/Redirect/HomeRedirect.jsx";

import { AdminDashboard } from "./screens/Panels/adminDashboard";
import { AddStudent } from "./screens/student/addStudent";
import { StudentList } from "./screens/student/studentList";
import { AddTeacher } from "./screens/teacher/addTeacher";
import { TeacherList } from "./screens/teacher/teacherList";
import { NotFound } from "./screens/notFound/NotFound.jsx";
import { Login } from "./screens/Login/login";
import { ProtectedRoute } from "./components/ProtectedRoutes/ProtectedRoute.jsx";

import { Topbar } from "./components/topbar/Topbar";
import { Sidebar } from "./components/sidebar/sidebar";

import StudentDashboard from "./screens/Panels/studentDashboard.jsx";
import "./App.css";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`main-content ${collapsed ? "sidebar-collapsed" : ""
          }`}
      >
        <Topbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* any logged-in user */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<HomeRedirect />} />

          {/* admin only */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/add" element={<AddTeacher />} />
          </Route>

          {/* student only */}
          <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
            <Route path="/" element={<StudentDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* catch-all */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;