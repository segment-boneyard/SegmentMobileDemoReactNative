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
      <View style={{height: 80, backgroundColor: 'white', flexDirection: 'row', alignItems: 'baseline'}}>
        <View style={{flex: 0.1}}/>  // Back Button
        <View style={{flex: 0.8}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingBagScreen')}>
            <Image style={{ height: 25, width: 35, marginRight: 35, marginTop: 30}} source={Images.bagButtonSmall}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default NavigationHeader;
