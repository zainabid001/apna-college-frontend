import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    token: "",
    name: '',
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.isLoggedIn = false;
            state.token = '';
            state.name = '';
            state.email = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUser = (state: any) => state.user;
export default userSlice.reducer;
