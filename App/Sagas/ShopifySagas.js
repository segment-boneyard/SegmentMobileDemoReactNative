import { call, put } from 'redux-saga/effects'
import { fetchProducts } from '../Apollo/client';
import R from 'ramda';
import ShopifyActions from '../Redux/ShopifyRedux';

export const getProductNodes = R.compose(
  R.map(R.pick(['id', 'title', 'description', 'variants'])),
  R.map(R.pathOr({},['node']))
  );

// Unfortunately the Shopify API returns values in a horribly-designed format with
// tons of pointless nesting

export const trimVariants = R.over(
  R.lensPath(['variants']),
  R.map(R.path(['edges.node'])),
  R.map(R.pick(['id', 'title', 'price', 'image']))
);

export function * getProducts(api, action) {
  try {
    const result = yield call(fetchProducts);
    const products = getProductNodes(result.data.shop.products.edges);
    yield put(ShopifyActions.productSuccess(products));
  } catch (e) {
    yield put(ShopifyActions.productFailure());
  }
}
