import React, { useState } from "react";
import './Restaurants.css'
import RestaurantItem from "./RestauranItem";

function Restuarants() {
    const [RestaurantContentDiv, SetRestaurantContentDiv] = useState('')

    const GetRestuarants = () => {
        // TODO  add API
        return (
            [1,2,2,3,3,40]
        );
    }

    const RestuaransList = GetRestuarants();

    const RestaurantItems = RestuaransList.map(
        (restaurant) => {
            return (<RestaurantItem name={restaurant} onclickFunc={SetRestaurantContentDiv}/>);
        }
    )

    return (
        <>
        <div className="restaurancontainer">
            <div className="left">
            <   ul className="list-group">
                    {RestaurantItems}
                </ul>
            </div>
            <div class="right">{RestaurantContentDiv}</div>
            </div>
        </>
    );
}

export default Restuarants;
