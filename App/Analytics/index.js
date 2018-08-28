import Analytics from "react-native-analytics";

// Event names for events sent to Segment from the app - these should be
// fairly self-explanatory - change the strings below to change the event names
// sent to the Segment workspace.  Note that this is not necessarily the best
// implementation approach but these are here to illustrate how to call the
// various Segment eCommerce events.

const TRACK_PRODUCT_ADDED = "Product Added";
const TRACK_PRODUCT_REMOVED = "Product Removed";
const TRACK_PRODUCT_VIEWED = "Product Viewed";
const TRACK_PRODUCT_CLICKED = "Product Clicked";

const TRACK_CHECKOUT_STARTED = "Checkout Started";
const TRACK_CHECKOUT_COMPLETED = "Order Completed";
const TRACK_CART_VIEWED = "Cart Viewed";
const TRACK_PRODUCT_LIST_VIEWED = "Product List Viewed";

export function identify(id, email) {
  Analytics.identify(id, {
    email: email
  });
  Analytics.flush();
}

export function productAdded(variant) {
  Analytics.track(TRACK_PRODUCT_ADDED, { ...variant });
  Analytics.flush();
}

export function productRemoved(variant) {
  Analytics.track(TRACK_PRODUCT_REMOVED, { ...variant });
  Analytics.flush();
}

export function checkoutStarted(cart) {
  Analytics.track(TRACK_CHECKOUT_STARTED, {
    revenue: cart.total,
    products: cart.products,
    currency: "USD"
  });
  Analytics.flush();
}

export function checkoutCompleted(cart) {
  Analytics.track(TRACK_CHECKOUT_COMPLETED, {
    total: cart.total,
    products: cart.products,
    currency: "USD"
  });
  Analytics.flush();
}

export function cartViewed(cart) {
  Analytics.track(TRACK_CART_VIEWED, { products: cart.products });
  Analytics.flush();
}

export function productViewed(variant) {
  Analytics.track(TRACK_PRODUCT_VIEWED, { ...variant });
  Analytics.flush();
}

export function productListViewed(productList) {
  Analytics.track(TRACK_PRODUCT_LIST_VIEWED, { products: productList });
  Analytics.flush();
}
