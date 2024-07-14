import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../interfaces";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: {
      prepare(item: CartItem) {
        return {
          payload: {
            product: item.product,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          },
        };
      },

      reducer(state, action: PayloadAction<CartItem>) {
        let itemInCart = false;
        state.cart.forEach((item) => {
          if (item.product.id === action.payload.product.id) {
            item.quantity += action.payload.quantity;
            item.totalPrice += action.payload.totalPrice;
            itemInCart = true;
          }
        });

        if (itemInCart) {
          return;
        } else {
          state.cart.push(action.payload);
        }
      },
    },
    deleteCartItem: {
      prepare(item: CartItem) {
        return {
          payload: {
            product: item.product,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          },
        };
      },
      reducer(state, action: PayloadAction<CartItem>) {
        state.cart = state.cart.filter((item) => {
          return item.product.id !== action.payload.product.id;
        });
      },
    },
    cartItemQuantityPlus: {
      prepare(item: CartItem) {
        return {
          payload: {
            product: item.product,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          },
        };
      },
      reducer(state, action: PayloadAction<CartItem>) {
        state.cart.forEach((item) => {
          if (item.product.id === action.payload.product.id) {
            item.totalPrice = parseFloat(
              (item.product.price * (item.quantity + 1)).toFixed(2)
            );
            item.quantity += 1;
          }
        });
      },
    },
    cartItemQuantityMinus: {
      prepare(item: CartItem) {
        return {
          payload: {
            product: item.product,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          },
        };
      },
      reducer(state, action: PayloadAction<CartItem>) {
        state.cart.forEach((item) => {
          if (item.product.id === action.payload.product.id) {
            item.totalPrice = parseFloat(
              (item.product.price * (item.quantity - 1)).toFixed(2)
            );
            item.quantity -= 1;
          }
        });
      },
    },
  },
});

export const {
  addToCart,
  deleteCartItem,
  cartItemQuantityMinus,
  cartItemQuantityPlus,
} = cartSlice.actions;
export default cartSlice.reducer;
