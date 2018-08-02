import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         TouchableOpacity,
         Image } from 'react-native';

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: 80,
    marginTop: 20  // TODO:  This is an iOS only header
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

  render () {
    return (
      <View style={{height: 80, backgroundColor: 'blue', flexDirection: 'row'}}>
        <View style={{flex: 0.2}}/>  // Back Button
        <View style={{flex: 0.6}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 0.2, backgroundColor: 'red', marginTop: 35, marginLeft: 5}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingBagScreen')}>
            <Image style={{ height: 30, width: 30}} source={Images.bagButtonSmall}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default NavigationHeader;
