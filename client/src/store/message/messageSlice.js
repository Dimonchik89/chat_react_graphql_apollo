import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addAllMessages: (state, action) => {
            state.messages = action.payload
        },
        addOneMessage: (state, action) => {
            state.messages.push(action.payload)
        }
    }
})

const { actions, reducer } = messageSlice
export const { addAllMessages, addOneMessage } = actions;
export { reducer }