import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { isIphoneX } from '../Themes/Metrics';
import * as Segment from '../Analytics';

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: 125,
    marginTop: 40 // TODO:  This is an iOS only header
  },
  buttonRight: {
    width: 32,
    height: 32
  }
});

const Images = {
  bagButtonSmall: require('../Images/Icons/shopping-bag-512.png'),
  cancelButtonSmall: require('../Images/Icons/cancel-32.png'),
  backButtonSmall: require('../Images/Icons/back-arrow-32.png')
};

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
  }

  cartItems = () => {
    if (this.props.cart.products.length > 0) {
      return (
        <Text style={{ textAlign: 'center', alignSelf: 'center', top: 10 }}>{`${
          this.props.cart.products.length
        }`}</Text>
      );
    } else {
      return <Text>{''}</Text>;
    }
  };

  modalOrNotRight = () => {
    if (this.props.modal) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image
            style={{ height: 30, width: 30 }}
            source={Images.cancelButtonSmall}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            Segment.cartViewed(this.props.cart);
            this.props.navigation.navigate('ShoppingBagScreen');
          }}
        >
          <ImageBackground
            style={{ height: 30, width: 30 }}
            source={Images.bagButtonSmall}
          >
            {this.cartItems()}
          </ImageBackground>
        </TouchableOpacity>
      );
    }
  };

  modalOrNotLeft = () => {
    if (!this.props.modal && !isIphoneX() && this.props.nav.index !== 0) {
      return (
        <View
          style={{
            flex: 0.2,
            marginTop: 45,
            marginRight: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{ height: 30, width: 30 }}
              source={Images.backButtonSmall}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 0.2 }} /> // Back Button
      );
    }
  };

  render() {
    return (
      <View
        style={{
          height: 90,
          backgroundColor: 'white',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#43464b'
        }}
      >
        {this.modalOrNotLeft()}
        <View style={{ flex: 0.6, marginTop: 55 }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            marginTop: 45,
            marginLeft: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          {this.modalOrNotRight()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.shopify.cart,
  nav: state.nav
});

export default connect(mapStateToProps)(NavigationHeader);
