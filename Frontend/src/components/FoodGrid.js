// FoodGrid.js
import React, { lazy, Suspense } from 'react';

const Food = lazy(() => import('./Food'));

function FoodGrid({foods}) {
    const foodCards = foods.map((food, index) => {
        return (
            <div className="col">
                <Suspense fallback={<div>Loading food...</div>}>
                    <Food key={index}/>
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
