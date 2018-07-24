import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ProductsGrid from '../Components/ProductsGrid';
import ShopifyActions from '../Redux/ShopifyRedux';

// Styles
import styles from './Styles/LaunchScreenStyles'

export class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ProductsGrid products={this.props.products} nav={this.props.nav}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fetching: state.shopify.fetching,
  error: state.shopify.error,
  products: state.shopify.products,
  nav: state.nav });

export default connect(mapStateToProps)(LaunchScreen);
