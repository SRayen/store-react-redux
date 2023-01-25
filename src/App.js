import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
import React from 'react';

function App() {
  const { cartItems,isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems())
  },[])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }



  return (
    <main>
    {/* c a d if (isOpen==true) ==> afficher <Modal /> */}
    {isOpen && <Modal />}
      
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
