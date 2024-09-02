import usersSlice from "./usersSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice.js";

const store = configureStore({
    reducer: {
        users: usersSlice,
        loader: loaderSlice
    }
});

export default store;