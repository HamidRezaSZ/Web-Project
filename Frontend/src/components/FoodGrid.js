// FoodGrid.js
import React, { lazy, Suspense } from 'react';

const Food = lazy(() => import('./Food'));

function FoodGrid({foods}) {
    console.log(foods);
    const foodCards = foods.map(({name, description, price, id, comments}, index) => {
        return (
            <div className="col">
                <Suspense fallback={<div>Loading food...</div>}>
                    <Food key={index} name={name} description={description} price={price} id={id} comments={comments}/>
                </Suspense>
            </div>
        );
    });

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row hidden-md-up">
                            {foodCards}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FoodGrid;
