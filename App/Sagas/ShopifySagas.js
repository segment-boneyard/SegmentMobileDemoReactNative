import { call, put } from 'redux-saga/effects'
import { client, fetchProducts } from '../Apollo/client';

export function * getProducts(action) {
  yield fetchProducts();
}
