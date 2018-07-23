import { call, put } from 'redux-saga/effects'
import { fetchProducts } from '../Apollo/client';
import R from 'ramda';
import ShopifyActions from '../Redux/ShopifyRedux';

export const getProductNodes = R.compose(
  R.map(R.pick(['id', 'title', 'variants'])),
  R.map(R.pathOr({},['node']))
  );

export function * getProducts(api, action) {
  try {
    const result = yield call(fetchProducts);
    const products = getProductNodes(result.data.shop.products.edges);
    //console.log(JSON.stringify(result.data.shop,null, 2));
    console.tron.log({message: 'ShopifyActions', actions: ShopifyActions });
    yield put(ShopifyActions.productSuccess(products));
  } catch (e) {
    //console.log('Error: ', e);
    yield put(ShopifyActions.productFailure());
  }
}
