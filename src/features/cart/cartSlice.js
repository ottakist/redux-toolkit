import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';
const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      return { ...state, cartItems: [] };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleAmount: (state, { payload }) => {
      const actionType = payload.type;
    
      if (actionType === 'increase') {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        cartItem.amount += 1;
      }
      if (actionType === 'decrease') {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        if (cartItem.amount <= 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== payload.id
          );
        }
        cartItem.amount -= 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});
export const {
  clearCart,
  removeItem,
  toggleAmount,
  decrease,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
