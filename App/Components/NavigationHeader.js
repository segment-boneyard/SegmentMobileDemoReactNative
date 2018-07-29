import React, { Component } from 'react';
import { StyleSheet,
         View,
         Text,
         TouchableOpacity,
         Image } from 'react-native';
import { Header } from 'react-navigation';

const style = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
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
    <View
      style={{
        height: 56,
        marginTop: 20
      }}
    >
      <Header {...props} />
    </View>
  );
};

export default NavigationHeader;
