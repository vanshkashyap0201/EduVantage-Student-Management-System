import {
    getStudents,
    createStudent,
    deleteStudent,
    deleteStudents,
    getTeachers,
    createTeacher,
    deleteTeacher,
    deleteTeachers
} from "../services/api";

import { setStudents, setTeachers } from "./dataSlice";

// Student-------------------------------------------------------------------------------------

// Fetching Student Data
export const fetchStudentData = () => {
    return async (dispatch) => {
        try {
            const result = await getStudents();

            dispatch(setStudents(result.data));
        } catch (e) {
            console.log("Error during fetching students:", e);
        }
    };
};

// Adding Student
export const addStudent = (values) => {
    return async (dispatch, getState) => {
        try {
            const response = await createStudent(values);

            const students = getState().data.students;

            dispatch(
                setStudents([
                    ...students,
                    response.data.student
                ])
            );

            return response.data;
        } catch (error) {
            console.error("Error adding student:", error);
            throw error;
        }
    };
};

// Deleting Single Student
export const removeStudent = (studentId) => {
    return async (dispatch, getState) => {
        try {
            await deleteStudent(studentId);

            const students = getState().data.students;

            dispatch(
                setStudents(
                    students.filter(
                        (student) => student._id !== studentId
                    )
                )
            );
        } catch (error) {
            console.error("Error during deleting student:", error);
            throw error;
        }
    };
};

// Deleting Multiple Students
export const removeStudents = (studentIds) => {
    return async (dispatch, getState) => {
        try {
            await deleteStudents(studentIds);

            const students = getState().data.students;

            dispatch(
                setStudents(
                    students.filter(
                        (student) => !studentIds.includes(student._id)
                    )
                )
            );
        } catch (error) {
            console.error("Error during deleting students:", error);
            throw error;
        }
    };
};

// Teacher-------------------------------------------------------------------------------------

// Fetching Teacher Data
export const fetchTeacherData = () => {
    return async (dispatch) => {
        try {
            const result = await getTeachers();

            dispatch(setTeachers(result.data));
        } catch (e) {
            console.log("Error during fetching teachers:", e);
        }
    };
};


// Adding Teacher
export const addTeacher = (values) => {
    return async (dispatch, getState) => {
        try {
            const response = await createTeacher(values);

            const teachers = getState().data.teachers;

            dispatch(
                setTeachers([
                    ...teachers,
                    response.data.teacher
                ])
            );

            return response.data;
        } catch (error) {
            console.error("Error adding teacher:", error);
            throw error;
        }
    };
};

// Deleting Single Teacher
export const removeTeacher = (teacherId) => {
    return async (dispatch, getState) => {
        try {
            await deleteTeacher(teacherId);

            const teachers = getState().data.teachers;

            dispatch(
                setTeachers(
                    teachers.filter(
                        (teacher) => teacher._id !== teacherId
                    )
                )
            );
        } catch (e) {
            console.log("Error during deleting teacher:", e);
            throw e;
        }
    };
};

// Deleting Multiple Teachers
export const removeTeachers = (teacherIds) => {
    return async (dispatch, getState) => {
        try {
            await deleteTeachers(teacherIds);

            const teachers = getState().data.teachers;

            dispatch(
                setTeachers(
                    teachers.filter(
                        (teacher) => !teacherIds.includes(teacher._id)
                    )
                )
            );
        } catch (e) {
            console.log("Error during deleting teachers:", e);
            throw e;
        }
    };
};