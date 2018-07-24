import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: null,
  productSuccess: ['products'],
  productFailure: null
});

export const ShopifyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  products: null,
  fetching: null,
  error: null,
});

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
  const { products } = action;
  return state.merge({ fetching: false, products });
};

// failed to get products
export const failure = (state) =>
  state.merge({ fetching: false, error: true, products: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_FAILURE]: failure
});
