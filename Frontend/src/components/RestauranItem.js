// RestaurantItem.js
import React, { lazy, Suspense } from 'react';

const FoodGrid = lazy(() => import('./FoodGrid'));

function RestaurantItem({name='Restuarnt Item', onclickFunc=(props) => {}}) {

    const GetRestaurantFoods = () => {
        return (
            <Suspense fallback={<div>Loading foods...</div>}>
                <FoodGrid foods={[1, 2, 2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}/>
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
