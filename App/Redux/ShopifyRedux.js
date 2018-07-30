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
  cart: Immutable([]),
});

/* ------------- Selectors ------------- */

/*export const ShopifySelectors = {
  selectProducts: state => state.products
};*/

/* ------------- Reducers ------------- */

// request all products for the store
export const request = (state) => {
  return state.merge({ fetching: true, error: null, products: null });
}

// successful product fetch
export const success = (state, action) => {
  const { products } = action;
  return state.merge({ fetching: false, error: null, products });
}

// failed to get products
// TODO: This needs to be handled in the UI - right now it is pretty much going to crash
export const failure = (state) => {
  return state.merge({ fetching: false, error: true, products: null });
}

export const variantSelected = (state, action) => {
  const { variant } = action;
  return state.merge({ selectedVariant: variant });
}

export const addToCart = (state, action) => {
  const { variant } = action;
  return state.merge({ cart: state.cart.concat([variant]) });
}

export const removeFromCart = (state, action) => {

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
