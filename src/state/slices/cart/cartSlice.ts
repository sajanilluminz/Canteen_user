import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IPlaceOrderObj} from '../commonTypes';
import {RootState} from '~state/store';

interface ICartInitialState {
  showCart: boolean;
  cartItems: IPlaceOrderObj[];
  cartTotal: number;
}

const initialState: ICartInitialState = {
  showCart: false,
  cartItems: [],
  cartTotal: 0,
};

const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IPlaceOrderObj>) => {
      let prevCart = [...state.cartItems];

      const existingItem = prevCart.find(
        item => item.itemId === action.payload.itemId,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        prevCart.push(action.payload);
      }
      state.cartItems = prevCart;
      state.cartTotal += action.payload.price;
    },

    clearCart: state => {
      state.cartTotal = 0;
      state.cartItems = [];
      state.showCart = false;
    },
    removeProductFromCart: (state, action: PayloadAction<IPlaceOrderObj>) => {
      let prevTotal = state.cartTotal;
      state.cartTotal = prevTotal - action.payload.price;
      if (state.cartItems.length) {
        const itemIndex = state.cartItems.findIndex(
          item => item.itemId === action.payload.itemId,
        );
        if (itemIndex !== -1) {
          const removedItem = state.cartItems[itemIndex];
          if (removedItem.quantity > 1) {
            removedItem.quantity -= 1;
          } else {
            state.cartItems.splice(itemIndex, 1);
          }
        }
      }
    },
  },
});

export default CartSlice.reducer;
export const {addProductToCart, clearCart, removeProductFromCart} =
  CartSlice.actions;
export const getCartItemsFromState = (state: RootState) => state.cart.cartItems;
export const getCartTotalFromState = (state: RootState) => state.cart.cartTotal;
export const getCartDisplayState = (state: RootState) => state.cart.showCart;
