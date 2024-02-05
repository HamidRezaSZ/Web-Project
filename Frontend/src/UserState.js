import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodCart: [],
    isLoggedIn: false
}

export const userState = createSlice({
    name: 'userstate',
    initialState,
    reducers: {
        toggleLoggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        },
        addFoodToCart: (state, action) => {
            state.foodCart = [...state.foodCart, action.payload]
        },
        emptyFoodCart: (state) => {
            state.foodCart = []
        }
    },
});

export const { toggleLoggedIn, addFoodToCart, emptyFoodCart } = userState.actions;

export default userState.reducer;
