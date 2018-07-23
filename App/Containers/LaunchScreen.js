import React, { Component } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { Images } from '../Themes';
import { connect } from 'react-redux';
import ProductsGrid from '../Components/ProductsGrid';

// Styles
import styles from './Styles/LaunchScreenStyles'

export class LaunchScreen extends Component {
  render () {
    console.tron.log({ message: 'logging props', props: this.props});
    return (
      <View style={styles.mainContainer}>
        <ProductsGrid/>
      </View>
    )
  }
}

const mapStateToProps = state => ({navgation: state.navigate, products: state.products});
export default connect(mapStateToProps)(LaunchScreen);
