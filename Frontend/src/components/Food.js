import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addFoodToCart } from "../UserState";

const CommentSection = lazy(() => import('./CommentSection'));

function Food({name='food', description='description', restaurant='restuarant', price='price'}){

  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  const AddToCart = () => {
    dispatch(addFoodToCart({'name': name, 'description': description, 'restaurant': restaurant, 'price': price}));
  }

 return (
    <div className="card" style={{width: "20rem"}}>
      <div className="card-header">{name}</div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">{restaurant}</h6>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-1 align-items-center justify-content-center">
          <ins style={{color: "red"}}>{price}</ins>
          <button className="btn btn-success" onClick={AddToCart}>Add to cart</button>
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection/>
          </Suspense>
        </div>
      </div>
    </div>
 );
}

export default Food;
