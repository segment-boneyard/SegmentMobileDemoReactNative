import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { ShopifyTypes } from '../Redux/ShopifyRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { getProducts } from './ShopifySagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ShopifyTypes.PRODUCT_REQUEST, getProducts) // Trigger product load
  ]);
}
