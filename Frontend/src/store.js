import { configureStore } from "@reduxjs/toolkit";
import userStateReducer from './UserState'

export const store = configureStore({
    reducer: {
        user: userStateReducer,
    }
});
