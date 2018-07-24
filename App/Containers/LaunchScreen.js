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
    console.tron.log({ message: 'logging props', props: this.props});
    return (
      <View style={styles.mainContainer}>
        <ProductsGrid products={this.props.products}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({navigation: state.navigate, fetching: state.fetching, error: state.error, products: state.products});
const mapDispatchToProps = (dispatch) => ({
  products: () => dispatch(ShopifyActions.productSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
