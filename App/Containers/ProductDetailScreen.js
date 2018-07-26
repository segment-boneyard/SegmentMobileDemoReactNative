import React, { Component } from 'react';
import { Text,
         Image,
         View } from 'react-native';
import styles from './Styles/LaunchScreenStyles'
import VariantSelector from '../Components/VariantSelector';

export default class ProductDetailScreen extends Component {

  handleVariantChange = () => {
  }

  render() {
    // TODO: This is kind of hacky and unsafe but for now...will have to do...
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.itemLabel}>{params.title}</Text>
        <Text style={styles.itemPrice}>{params.variants.edges[0].node.price}</Text>
        <Image style={styles.imageStyle} source={{uri: `${params.variants.edges[0].node.image.src}`}}/>
        <VariantSelector variants={params.variants} handleOptionChange={this.handleVariantChange}/>
      </View>
    );
  }
}
