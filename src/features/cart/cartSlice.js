import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React from 'react';
// import cartItems from '../../cartItems'

const url='https://fakestoreapi.com/products'

const initialState = {
    cartItems: [],
    total:0,
    amount:0,
    isLoading:true,
    cartSum:0,
}
// async data from API
//we have used thunkAPI to exploit it if the are errors
export const getCartItems=createAsyncThunk('cart/getCartItems', async(name,thunkAPI) => {
  try {
    const resp=await axios(url)
    return resp.data
    
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong')

   }
})



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
              clearCart:(state) => {
            state.cartItems=[]
        
        },
        removeItem:(state,action)=> {
            const itemId=action.payload
            state.cartItems=state.cartItems.filter(item=>item.id!==itemId)
        },
    
        increase : (state,action) => {
            const itemId=action.payload
            const cartItem=state.cartItems.find((item) => item.id === itemId)
            // rq: don't confused amount of the table and the general amount
            cartItem.rating.count+=1
        },
        decrease : (state,{payload}) => {
            const cartItem=state.cartItems.find((item) => item.id === payload.id)
            cartItem.rating.count-=1
        },
        calculateTotals : (state) => {
            let amount=0
            let total=0
            state.cartItems.forEach((item) => {
                amount+=item.rating.count
                total+=total+item.price*item.rating.count
        })
        state.amount=amount
        state.total=total
    }
},

extraReducers:{
    [getCartItems.pending]:(state)=> {
        state.isLoading=true
},
[getCartItems.fulfilled]:(state,action)=> {
    console.log(action)
    state.isLoading=false
    state.cartItems=action.payload
},
[getCartItems.rejected]:(state,action)=> {
    console.log(action);
    state.isLoading=false
}
}})

//console.log(cartSlice)
export const {clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions

export default cartSlice.reducer