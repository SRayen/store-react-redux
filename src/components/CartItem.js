import { ChevronDown, ChevronUp } from "../icons";
import { removeItem,increase,decrease } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';



const CartItem = ({ id, image, title, price,rating }) => {
  const dispatch = useDispatch();
  

  return (
    <article className="cart-item">
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={()=>{dispatch(removeItem(id))}}>remove</button>
      </div>
      <div>
        <button className="amount-btn" onClick={()=> {dispatch(increase(id))}}>
            <ChevronUp/>
        </button>
        <p className="amount">{rating.count}</p>
        <button className="amount-btn"  onClick={()=>{
         if (rating.countcount===1){
          dispatch(removeItem(id))
          return;
        }
         dispatch(decrease({id}))
         }}>
            <ChevronDown/>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
