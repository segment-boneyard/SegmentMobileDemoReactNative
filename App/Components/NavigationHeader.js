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
  cancelButtonSmall: require('../Images/Icons/cancel-32.png'),
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

  modalOrNot = () => {
    if(this.props.modal) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image style={{ height: 30, width: 30}} source={Images.cancelButtonSmall}/>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingBagScreen')}>
          <ImageBackground style={{ height: 30, width: 30}} source={Images.bagButtonSmall}>
            {this.cartItems()}
          </ImageBackground>
        </TouchableOpacity>
      );
    }
  }

  render () {
    return (
      <View style={{height: 90, backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#43464b'}}>
        <View style={{flex: 0.2}}/>  // Back Button
        <View style={{flex: 0.6, marginTop: 55}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 0.2, marginTop: 45, marginLeft: 1, flexDirection: 'row', justifyContent: 'center'}}>
          {this.modalOrNot()}
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  cart: state.shopify.cart,
});

export default connect(mapStateToProps)(NavigationHeader);
