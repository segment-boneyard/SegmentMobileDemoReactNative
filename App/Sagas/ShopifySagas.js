import { call, put } from 'redux-saga/effects'
import { fetchProducts } from '../Apollo/client';

export function * getProducts(action) {
  try {
    const result = yield call(fetchProducts);
    console.log(result);
  } catch (e) {
    console.log('Error: ', e);
  }
}
