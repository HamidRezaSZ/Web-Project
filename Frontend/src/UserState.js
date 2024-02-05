import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodCart: [],
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
}

export const userState = createSlice({
    name: 'userstate',
    initialState,
    reducers: {
        // toggleLoggedIn: (state) => {
        //     state.isLoggedIn = !state.isLoggedIn
        // },
        addFoodToCart: (state, action) => {
            state.foodCart = [...state.foodCart, action.payload]
        },
        emptyFoodCart: (state) => {
            state.foodCart = []
        },
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
        }
    },
});

export const { addFoodToCart, emptyFoodCart, login, logout } = userState.actions;

export default userState.reducer;
