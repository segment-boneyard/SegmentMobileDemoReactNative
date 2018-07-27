import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: null,
  productSuccess: ['products'],
  productFailure: null,
  addToCart: ['variant'],
  removeFromCart: ['variant'],
  clearCart: null,
  variantSelected: ['variant'],
});

export const ShopifyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  products: null,
  fetching: null,
  error: null,
  selectedVariant: null,
  cart: null,
});

/* selectedVariant =
 { productId: ,  //Main product ID
   productImage: ,  // Image URL
   variantId: ,  // Variant ID
   title: ,  // Product name
   price: , // Product (variant) price
   variant: } */

/* ------------- Selectors ------------- */

export const ShopifySelectors = {
  selectProducts: state => state.products
};

/* ------------- Reducers ------------- */

// request all products for the store
export const request = (state) =>
  state.merge({ fetching: true, error: null, products: null });

// successful product fetch
export const success = (state, action) => {
  //console.log({message: 'reducer state', state, action});
  const { products } = action;
  const newState = { fetching: false, products };
  //console.log({message: 'new state', newState });
  return state.merge(newState);
};

// failed to get products
// TODO: This needs to be handled in the UI - right now it is pretty much going to crash
export const failure = (state) =>
  state.merge({ fetching: false, error: true, products: null });

export const variantSelected = (state, variant) => {

}

export const addToCart = (state, variant) => {

}

export const removeFromCart = (state, variant) => {

}

export const clearCart = (state) => {

}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_FAILURE]: failure,
  [Types.ADD_TO_CART]: addToCart,
  [Types.REMOVE_FROM_CART]: removeFromCart,
  [Types.CLEAR_CART]: clearCart,
  [Types.VARIANT_SELECTED]: variantSelected,
});
