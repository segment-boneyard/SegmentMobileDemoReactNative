import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import ProductDetail from '../Components/ProductDetail';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class ProductDetailScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ProductDetail/>
      </View>
    )
  }
}
