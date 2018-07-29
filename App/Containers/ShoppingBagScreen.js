import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ShopifyActions from '../Redux/ShopifyRedux';
import { NavigationActions } from 'react-navigation';

// Styles
import styles from './Styles/LaunchScreenStyles'

export class ShoppingBagScreen extends Component {

  static navigationOptions = {
    title: 'YOUR BAG',
  };

  render () {
    return (
      <View style={styles.mainContainer}>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.shopify.cart,
  nav: state.nav
});

export default connect(mapStateToProps)(ShoppingBagScreen);
