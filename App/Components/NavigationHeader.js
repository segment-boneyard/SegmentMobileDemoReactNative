import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         TouchableOpacity,
         Image,
         ImageBackground } from 'react-native';
import { connect } from 'react-redux';

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: 125,
    marginTop: 40  // TODO:  This is an iOS only header
  },
  buttonRight: {
    width: 32,
    height: 32,
  },
});

const Images = {
  bagButtonSmall: require('../Images/Icons/shopping-bag-512.png'),
};

class NavigationHeader extends Component {

  constructor(props) {
    super(props);
  }

  cartItems = () => {
    if(this.props.cart.length > 0) {
      return (<Text style={{textAlign: 'center', alignSelf: 'center', top: 10}}>{`${this.props.cart.length}`}</Text>);
    } else {
      return (<Text></Text>);
    }
  }

  render () {
    return (
      <View style={{height: 90, backgroundColor: 'white', flexDirection: 'row'}}>
        <View style={{flex: 0.2}}/>  // Back Button
        <View style={{flex: 0.6, marginTop: 45}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 0.2, marginTop: 40, marginLeft: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingBagScreen')}>
            <ImageBackground style={{ height: 30, width: 30}} source={Images.bagButtonSmall}>
              {this.cartItems()}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  cart: state.shopify.cart,
});

export default connect(mapStateToProps)(NavigationHeader);
