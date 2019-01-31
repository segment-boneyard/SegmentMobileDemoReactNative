import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ProductsGrid from '../Components/ProductsGrid';
import NavigationHeader from '../Components/NavigationHeader';
import AppLoadingSplash from '../Components/AppLoadingSplash';
import ShopifyActions from '../Redux/ShopifyRedux';
import { NavigationActions } from 'react-navigation';
import * as Segment from '../Analytics';
import { getIDFA } from '../Profiles/index';

// Styles
import styles from './Styles/LaunchScreenStyles';

export class LaunchScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };

  detailScreen = item => {
    // This passes params via navigation, which is a kludge. Read about it here:
    // https://reactnavigation.org/docs/en/params.html
    // TODO: Consider using https://github.com/vonovak/react-navigation-props-mapper

    this.props.navigation.navigate('ProductDetailScreen', { ...item });
  };

  render() {
    if (this.props.fetching) {
      // Show the splash screen
      return (
        <View style={styles.productList}>
          <AppLoadingSplash />
        </View>
      );
    } else {
      return (
        <View style={styles.productList}>
          <NavigationHeader
            title={'FLASH GEAR'}
            navigation={this.props.navigation}
          />
          <ProductsGrid
            products={this.props.products}
            onPressItem={this.detailScreen}
          />
        </View>
      );
    }
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
    dispatch(NavigationActions.navigate({ routeName: 'ProductDetailScreen' }));
  }
});

export default connect(mapStateToProps)(LaunchScreen);
