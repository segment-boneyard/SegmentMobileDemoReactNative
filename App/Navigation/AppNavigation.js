import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { NavigationHeader } from '../Components/NavigationHeader';
import styles from './Styles/NavigationStyles';
import { TouchableOpacity, Text, Image } from 'react-native';

import LaunchScreen from '../Containers/LaunchScreen';
import ProductDetailScreen from '../Containers/ProductDetailScreen';
import ShoppingBagScreen from '../Containers/ShoppingBagScreen';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen,
    },
    ProductDetailScreen: {
      screen: ProductDetailScreen
    },
    ShoppingBagScreen: {
      screen: ShoppingBagScreen
    }
  }, {
    // Default config for all screens,
    header: 'float',
    initialRouteName: 'LaunchScreen',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 80,
        marginTop: 20,
      },
      headerRight: <TouchableOpacity onPress={() => navigation.navigate('ShoppingBagScreen')}>
      <Image style={{
          height: 32,
          width: 32,
          marginRight: 10,
          marginTop: 5}}
        source={require('../Images/Icons/handbag-32.png')}/>
      </TouchableOpacity>
    }),
});

export default PrimaryNav;
