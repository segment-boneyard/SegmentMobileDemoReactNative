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
  button: {
    width: 32,
    height: 32,
  },
});

const Images = {
  bagButtonSmall: require('../Images/Icons/handbag-32.png'),
};

class NavigationHeader extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={{height: 75, backgroundColor: 'white', flexDirection: 'row', alignItems: 'baseline'}}>
        <View style={{flex: 0.1}}/>  // Back Button
        <View style={{flex: 0.8}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>{this.props.title}</Text>
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ShoppingBagScreen')}>
            <Image style={{ height: 20, width: 20, marginRight: 20, marginTop: 40}} source={Images.bagButtonSmall}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default NavigationHeader;
