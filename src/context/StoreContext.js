import {createContext, useReducer} from 'react'

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : ''
  },
  favoriteItems: localStorage.getItem('favoriteItems') ? JSON.parse(localStorage.getItem('favoriteItems')) : [],
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

function reducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'ADD_ITEM' : {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(item => item._key === newItem._key)
      const cartItems = existingItem
        ? state.cart.cartItems.map(item => item._key === existingItem._key ? newItem : item)
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems}}
    }
    case 'REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(item => item._key !== action.payload._key);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {...state, cart: {...state.cart, cartItems}}
    }
    case 'USER_LOGIN':
      return {...state, userInfo: action.payload}
    case 'USER_LOGOUT':
      return {...state, userInfo: null, cart: {cartItems: [], shippingAddress: {}}}
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload
        }
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    case 'CLEAR_CART':
      return {...state, cart: {...state.cart, cartItems: []}}
    case 'ADD_FAVORITE':
      const newItem = action.payload;
      const existingItem = state.favoriteItems.find(item => item._key === newItem._key)
      const favoriteItems = existingItem
        ? state.favoriteItems.map(item => item._key === existingItem._key ? newItem : item)
        : [...state.favoriteItems, newItem];
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
      return {...state, favoriteItems: favoriteItems}
    case 'REMOVE_FAVORITE': {
      const favoriteItems = state.favoriteItems.filter(item => item._key !== action.payload._key);
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
      return {...state, favoriteItems: favoriteItems}
    }
  }
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{children}</Store.Provider>;
}


