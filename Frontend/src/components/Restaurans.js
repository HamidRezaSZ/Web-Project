import React, { useState, useEffect } from "react";
import './Restaurants.css'
import RestaurantItem from "./RestauranItem";
import { baseUrl } from '../config';

function Restuarants() {
    const [RestaurantContentDiv, SetRestaurantContentDiv] = useState('');
    const [RestauranItems, SetRestauranItems] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/restaurant/restaurants/`)
            .then(response => response.json())
            .then(data => {SetRestauranItems(data);console.log(data)}).catch(error => console.error('Error:', error));
            
    }, []);

    const RestuaransList = RestauranItems.map(
        ({name, id}) => {
            return (<RestaurantItem name={name} id={id} onclickFunc={SetRestaurantContentDiv}/>);
        }
    )

    return (
        <>
        <div className="restaurancontainer">
            <div className="left">
                <ul className="list-group">
                    {RestuaransList}
                </ul>
            </div>
            <div class="right">{RestaurantContentDiv}</div>
            </div>
        </>
    );
}

export default Restuarants;
