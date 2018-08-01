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
  bagButton: require('../Images/Icons/handbag-32.png'),
};

const NavigationHeader = props => {
  return (
    <View style={style.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingBagScreen')}>
        <Image style={{
          height: 32,
          width: 32,
          marginRight: 10,
          marginTop: 5}}
          source={require('../Images/Icons/cancel-cross-32.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;
