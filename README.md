#  SegmentMobileDemoReactNative
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo

**Step 2:** cd to the cloned repo

**Step 3:** yarn install

**Step 4:** cd ./ios && pod install (make sure you have Cocoapods set up)

If you are updating from an old version of this app - you may want to delete all of your Pods and reinstall them and rebuild the app (iOS only).

Make sure that you are using the Cocapods-generated .workspace file when working with xcode otherwise you will have problems.

In order for this app to be built and deployed to a simulator, you will need to enable a developer profile in xcode, even when using the command line build tools.

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native.

You have to provide a `.env` file with *at least* the following entries:

```
SEGMENT_WRITE_KEY= <your Segment write key>
SHOPIFY_API_URL= <your shopify API endpoint>
SHOPIFY_AUTH_TOKEN= <your shopify auth token>
```

For the app to work out of the box, you will want to copy the Shopify data format used in this app: [Segment Demo eCommerce Store](https://segment-ecommerce-demo-store.myshopify.com).
