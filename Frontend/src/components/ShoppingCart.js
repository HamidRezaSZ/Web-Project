import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyFoodCart } from "../UserState";

function ShoppingCart() {

    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    const Empty = () => {
        dispatch(emptyFoodCart());
    }

    const Buy = () => {
        if (!userState.isLoggedIn) {
            alert('You must login first!');
        } else {
            dispatch(emptyFoodCart());
        }
    }

    const GetFoods = () => {
        const FoodCart = userState.foodCart;
        return FoodCart.map((food) => {
            return (<li className="list-group-item">
                <div class="d-flex gap-1 align-items-center justify-content-center">
                    {food.name} <div class="vr"></div>
                    {food.description} <div class="vr"></div>
                    {food.restaurant} <div class="vr"></div>
                    {food.price}
                </div>
            </li>);
        });
    }

    return (
        <>
            <button type="button" className="btn btn-outline-danger" onClick={Empty}>Empty</button>
            <button type="button" className="btn btn-outline-success" onClick={Buy}>Buy</button>
            <hr/>
            <ul>
                {GetFoods()}
            </ul>
        </>
    );
}

export default ShoppingCart;
