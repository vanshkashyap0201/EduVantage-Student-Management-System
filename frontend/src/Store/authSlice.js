import { createSlice } from "@reduxjs/toolkit";

const getStoredAuth = () => {
    try {
        const storedAuth = localStorage.getItem("auth");

        return storedAuth
            ? JSON.parse(storedAuth)
            : {
                token: null,
                user: null,
                profile: null,
                isAuthenticated: false,
            };
    } catch {
        return {
            token: null,
            user: null,
            profile: null,
            isAuthenticated: false,
        };
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: getStoredAuth(),

    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.profile = action.payload.profile ?? null;
            state.isAuthenticated = true;

            localStorage.setItem(
                "auth",
                JSON.stringify({    
                    token: state.token,
                    user: state.user,
                    profile: state.profile,
                    isAuthenticated: true,
                })
            );
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.profile = null;
            state.isAuthenticated = false;

            localStorage.removeItem("auth");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;