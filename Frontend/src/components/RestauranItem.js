// RestaurantItem.js
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { baseUrl } from '../config';

const FoodGrid = lazy(() => import('./FoodGrid'));

function RestaurantItem({name='Restuarnt Item', id='-1', onclickFunc=(props) => {}}) {
    const [foodItems, SetfoodItems] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/restaurant/restaurants/${id}`)
            .then(response => response.json())
            .then(data => {SetfoodItems(data.foods);console.log(data)}).catch(error => console.error('Error:', error));
            
    }, []);

    const GetRestaurantFoods = () => {
        return (
            <Suspense fallback={<div>Loading foods...</div>}>
                <FoodGrid foods={foodItems}/>
            </Suspense>
        );
    }

    const ShowFoods = () => {
        const Foods = GetRestaurantFoods();
        onclickFunc(Foods);
    }

    return (
        <>
            <li className="list-group-item">
                <input className="form-check-input me-1" type="radio" name="ResturanGroupRadio" onClick={ShowFoods}/>
                <label className="form-check-label">{name}</label>
            </li>
        </>
    );
}

export default RestaurantItem;
