import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    email: null,
    userId: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.user = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.id
        },
    }
})

const { actions, reducer } = userSlice;
export const { createUser } = actions;
export { reducer }