import Analytics from '@segment/analytics-react-native';
import Appboy from '@segment/analytics-react-native-appboy';
import Config from 'react-native-config';
import R from 'ramda';

// Event names for events sent to Segment from the app - these should be
// fairly self-explanatory - change the strings below to change the event names
// sent to the Segment workspace.  Note that this is not necessarily the best
// implementation approach but these are here to illustrate how to call the
// various Segment eCommerce events.

const TRACK_PRODUCT_ADDED = 'Product Added';
const TRACK_PRODUCT_REMOVED = 'Product Removed';
const TRACK_PRODUCT_VIEWED = 'Product Viewed';
const TRACK_PRODUCT_CLICKED = 'Product Clicked';

const TRACK_CHECKOUT_STARTED = 'Checkout Started';
const TRACK_CHECKOUT_COMPLETED = 'Order Completed';
const TRACK_CART_VIEWED = 'Cart Viewed';
const TRACK_PRODUCT_LIST_VIEWED = 'Product List Viewed';

Analytics.setup(Config.SEGMENT_WRITE_KEY, {
  using: [Appboy],
  recordScreenViews: false,
  trackAppLifecycleEvents: false,
  trackAttributionData: true,

  android: {
    flushInterval: 60,
    collectDeviceId: true
  },
  ios: {
    trackAdvertising: true,
    trackDeepLinks: true
  }
})
  .then(() =>
    console.log('Analytics is ready')
  ).catch(err =>
  console.error('Something went wrong', err)
);

export function identify(id, email) {
  Analytics.identify(id, {
    email: email
  });
}

export function productAdded(variant) {
  Analytics.track(TRACK_PRODUCT_ADDED, { ...variant });
}

export function productRemoved(variant) {
  Analytics.track(TRACK_PRODUCT_REMOVED, { ...variant });
}

export function checkoutStarted(cart) {
  Analytics.track(TRACK_CHECKOUT_STARTED, {
    revenue: cart.total,
    products: cart.products,
    currency: 'USD'
  });
}

export function checkoutCompleted(cart) {
  Analytics.track(TRACK_CHECKOUT_COMPLETED, {
    total: cart.total,
    products: cart.products,
    currency: 'USD'
  });
}

export function cartViewed(cart) {
  Analytics.track(TRACK_CART_VIEWED, { products: cart.products });
}

export function productViewed(variant) {
  Analytics.track(TRACK_PRODUCT_VIEWED, { ...variant });
}

const getProducts = R.map(R.pick(['id', 'title']));

export function productListViewed(productList) {
  // Remove variants as these make messages too large with the
  // default Shopify payloads
  Analytics.track(TRACK_PRODUCT_LIST_VIEWED, { products: getProducts(productList) });
  Analytics.flush(); // Called to show this event immediately
}
