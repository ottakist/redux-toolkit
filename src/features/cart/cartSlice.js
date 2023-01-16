import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const url = 'https://course-api.com/react-useReducer-cart-project';
const initialState = {
  cartItems: [],
  amount: null,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
    });
});
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
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
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
