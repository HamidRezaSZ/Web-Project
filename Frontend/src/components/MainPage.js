import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import FoodGrid from "./FoodGrid";
import Restuarants from "./Restaurans";
import ShoppingCart from "./ShoppingCart";
import { baseUrl } from '../config';

function MainPage() {
    const [FoodsDisplay, SetFoodsDisplay] = useState(false);
    const [RestaurantDisplay, SetRestaurantDisplay] = useState(false);
    const [ShoppingCartDisplay, SetShoppingCartDisplay] = useState(false);
    const [Content, SetContent] = useState('');
    const [AllFoods, SetAllFoods] = useState('');

    useEffect(() => {
        fetch(`${baseUrl}/api/foods/foods/`)
            .then(response => response.json())
            .then(data => SetAllFoods(data));
    }, []);

    const RestaurantsClicked = () => {
        SetFoodsDisplay(false);
        SetRestaurantDisplay(true);
        SetShoppingCartDisplay(false);
        SetContent(<Restuarants/>);
    };
    const FoodsClicked = () => {
        SetFoodsDisplay(true);
        SetRestaurantDisplay(false);
        SetShoppingCartDisplay(false);
        SetContent(GetAllFoods());
    };
    const ShoppingCartClicked = () => {
        SetFoodsDisplay(false);
        SetRestaurantDisplay(false);
        SetShoppingCartDisplay(true);
        SetContent(<ShoppingCart/>);
    };

    const GetAllFoods = () => {
        console.log(AllFoods);
        return (<FoodGrid foods={[1, 2, 2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}/>);
    };

    return (
       <div className="main-page">
         <NavBar FoodsClicked={FoodsClicked} RestaurantsClicked={RestaurantsClicked} ShoppingCartClicked={ShoppingCartClicked} FoodsDisplay={FoodsDisplay} RestaurantDisplay={RestaurantDisplay} ShoppingCartDisplay={ShoppingCartDisplay}/>
         {Content}
       </div>
    );
   }

export default MainPage;   
