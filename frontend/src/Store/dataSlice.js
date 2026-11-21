import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students: [],
    teachers: [],
    users: [],
};

const dataSlice = createSlice({
    name: "data",

    initialState,

    reducers: {
        setStudents: (state, action) => {
            state.students = action.payload;
        },

        setTeachers: (state, action) => {
            state.teachers = action.payload;
        },

        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const {
    setStudents,
    setTeachers,
    setUsers,
} = dataSlice.actions;

export default dataSlice.reducer;