import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ProductsGrid from '../Components/ProductsGrid';
import ShopifyActions from '../Redux/ShopifyRedux';
import { NavigationActions } from 'react-navigation';

// Styles
import styles from './Styles/LaunchScreenStyles'

export class LaunchScreen extends Component {

  detailScreen = () => {
    this.props.navigation.navigate('ProductDetailScreen');
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ProductsGrid products={this.props.products} onPressItem={this.detailScreen}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fetching: state.shopify.fetching,
  error: state.shopify.error,
  products: state.shopify.products,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  detailScreen: () => {
    dispatch(NavigationActions.navigate({ routeName: 'ProductDetailScreen'})); },
});

export default connect(mapStateToProps)(LaunchScreen);
