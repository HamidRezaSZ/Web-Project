import React, { useState, useEffect } from "react";
import './Restaurants.css'
import RestaurantItem from "./RestauranItem";
import { baseUrl } from '../config';

function Restuarants() {
    const [RestaurantContentDiv, SetRestaurantContentDiv] = useState('')
    const [RestauranItems, SetRestauranItems] = useState('')

    useEffect(() => {
        fetch(`${baseUrl}/api/restaurant/restaurants/`)
            .then(response => response.json())
            .then(data => SetRestauranItems(data));
    }, []);

    const GetRestuarants = () => {
        console.log(RestauranItems);
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
