import { call, put } from 'redux-saga/effects'
import { fetchProducts } from '../Apollo/client';

export function * getProducts(action) {
  try {
    const results = yield call(fetchProducts);
    yield put(results.data);
  } catch (e) {
    console.log('Error');
  }
}
