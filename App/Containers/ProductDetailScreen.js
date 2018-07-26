import React, { Component } from 'react';
import { Text,
         Image,
         View,
         Button } from 'react-native';
import styles from './Styles/LaunchScreenStyles'
import VariantSelector from '../Components/VariantSelector';

export default class ProductDetailScreen extends Component {

  handleVariantChange = () => {
    // called when the product variant selector is changed
  }

  handleAddToCart = () => {

  }

  handleAddToWishlist = () => {

  }

  render() {
    // TODO: This is kind of hacky and unsafe but for now...will have to do...
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.itemTitleBar}>
          <Text style={styles.itemLabel}>
            {params.title}
          </Text>
          <Text style={styles.itemPrice}>
            {`$${params.variants.edges[0].node.price}`}
          </Text>
        </View>
        <Image
          style={styles.imageStyle}
          source={{uri: `${params.variants.edges[0].node.image.src}`}}/>
        <VariantSelector
          variants={params.variants}
          handleOptionChange={this.handleVariantChange}/>
        <Button
          onPress={this.handleAddToCart}
          title={'ADD TO CART'}/>
        <Button
          onPress={this.handleAddToWishlist}
          title={'ADD TO WISHLIST'}/>
      </View>
    );
  }
}
