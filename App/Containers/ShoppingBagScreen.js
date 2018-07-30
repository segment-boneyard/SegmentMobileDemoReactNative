import React, { Component } from 'react';
import { ScrollView, Text, Image, View, FlatList } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ShopifyActions from '../Redux/ShopifyRedux';
import { NavigationActions } from 'react-navigation';

// Styles
import styles from './Styles/LaunchScreenStyles'

class ShoppingBagScreen extends Component {

  static navigationOptions = {
    title: 'YOUR BAG',
  };

  constructor(props) {
    super(props);
  }

  renderItem = (item) => {
    return (
      <View style={styles.cartItemContainer}>
        <Image
          style={styles.cartImageStyle}
          source={{uri: `${item.productImage}`}}/>
        <View style={styles.cartItemTitleBar}>
          <Text style={styles.itemLabel}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
    );
  }

  renderCart = () => {
    if(this.props.cart.length === 0) {
      console.log('NOTHING IN CART.');
      return (
        <View style={styles.mainContainer}>
          <Text>{"Unfortunately your shopping bag is empty."}</Text>
          <Image style={{
            height: 128,
            width: 128,
            }}
            source={require('../Images/Icons/handbag-128.png')}/>
          <Text>{"Check out what's new?"}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.cart}
          renderItem={this.renderItem}
          keyExtractor={item => item.productId}/>
      );
    }
  }

  render () {
    return (
      <View>
        {this.renderCart()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { cart: state.shopify.cart,
  products: state.shopify.products,
  nav: state.nav, };
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(ShopifyActions.clearCart()); },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingBagScreen);
