import { configureStore } from "@reduxjs/toolkit"
import { reducer as messages } from "./message";
import { reducer as user } from "./user";

const store = configureStore({
    reducer: {
        messages,
        user
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;