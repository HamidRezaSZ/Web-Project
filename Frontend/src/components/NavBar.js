import React from "react";
import Login from "./Login";
import Register from './Register';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../UserState';

function NavBar({FoodsClicked=() => {}, RestaurantsClicked=() => {}, ShoppingCartClicked=() => {}, FoodsDisplay=true, RestaurantDisplay=true, ShoppingCartDisplay=true}) {

    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    const Logout = () => {
        dispatch(logout());
    }

    return (
        <>
        <nav className="navbar bg-body-tertiary border-bottom border-body">
            <div className="container-fluid">
                <strong>SnapFood</strong>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={FoodsClicked} checked={FoodsDisplay}/>
                    <label className="btn btn-outline-primary" for="btnradio1">Foods</label> */}
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={RestaurantsClicked} checked={RestaurantDisplay}/>
                    <label className="btn btn-outline-primary" for="btnradio2">Restaurants</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={ShoppingCartClicked} checked={ShoppingCartDisplay}/>
                    <label className="btn btn-outline-primary" for="btnradio3">ShoppingCart</label>
                </div>
                <div className="d-grid gap-2 d-md-block">
                    {!userState.isLoggedIn ?
                        <div>
                            <Login/>
                            <Register/>
                        </div> :
                        <button type="button" class="btn btn-danger" onClick={Logout}>Logout</button>
                    }
                </div>
            </div>
        </nav>
        </>
    );
}

export default NavBar
